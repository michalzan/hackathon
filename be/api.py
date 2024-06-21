import json
import os
import uuid
from typing import List, Literal

import dotenv
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi import FastAPI
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from redis import Redis
from fastapi.middleware.cors import CORSMiddleware

from api_model import InitResponse, Message

dotenv.load_dotenv()

description = """
Initiate chatbot with **init**.

Send user **message** with **conversation_id**.

Get chat history via **thread**.
"""

tags_metadata = [
    {
        "name": "Chat",
    },
    {
        "name": "Docs",
    }
]

app = FastAPI(
    title="AI Core API",
    summary="Skeleton API for AI Core library",
    description=description,
    openapi_tags=tags_metadata
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

redis = Redis(host=os.environ.get("REDIS_HOST", "localhost"), port=os.environ.get("REDIS_PORT", 6379))

PROMPT_TEMPLATE = ChatPromptTemplate.from_messages(
    [
        ("system",
         """Si expert na autá a tvojou úlohou je pomôcť zákazníkovy s výberom pri kúpe auta na Slovensku.
Zákazník ti v prvej správe pošle sadu otázok a odpovedí, ktorá ti pomôže navrhnúť mu tri autá.
Ak zákazník nemá predstavu o značke, v troch ponúknutých modeloch
by malo byť jedno Volvo, jeden Ford a jeden model od iného výrobcu, ktorý najlepšie
splňuje kritériá vyplývajúce z odpovedí, ktoré ti zákazník poslal.
Ku každému odporučenému modelu uveď cenu v eurách a mesačnú splátku v eurách pri 20% akontácii, 5% úrokovou mierou a dĺžkou splácania 48 mesiacov."""
         ),
        MessagesPlaceholder(variable_name="messages")
    ]
)
chat_model = ChatOpenAI(model="gpt-4o")
chain = PROMPT_TEMPLATE | chat_model


def get_all_messages(conversation_id: str, task: str = "conversation") -> List[Message]:
    return list(
        map(
            lambda x: json.loads(x), redis.lrange(f"{task}:{conversation_id}", 0, -1)
        )
    )


@app.post("/init", tags=["Chat"], summary="Initiate conversation with a new conversation id")
async def init_conversation() -> Message:
    """
    Initiate chatbot with the prompt environment variable.

    Returns:
    - **conversationId**
    """
    conversation_id = str(uuid.uuid4())
    response_id = str(uuid.uuid4())

    init_message = HumanMessage(
        content="",
        additional_kwargs={
            "conversation_id": conversation_id,
            "message_id": None
        }
    )

    result = await chain.ainvoke({"messages": [init_message]})
    result.additional_kwargs = {
            "conversation_id": conversation_id,
            "message_id": response_id
        }

    redis.rpush(f"conversation:{conversation_id}",
                json.dumps(result.dict(include={'content', 'additional_kwargs', 'type'})))

    return Message(
        messageType="ai",
        conversationId=conversation_id,
        content=result.content,
        messageId=response_id
    )


@app.post("/message", tags=["Chat"], summary="Send user message to chatbot")
async def post_message(request: Message) -> Message:
    """
    Request body:

    - **content**: content of the message
    - **conversationId**
    - **lastMessageId**: id the last message

    Returns:
    - **PostMessageResponse**
    """
    message_id = str(uuid.uuid4())
    response_id = str(uuid.uuid4())

    # last_message = redis.lindex(f"conversation:{request.conversation_id}", -1)
    # if not last_message:
    #     raise HTTPException(status_code=404, detail="Thread and last message combination not found")

    human_message = HumanMessage(
        content=request.content,
        additional_kwargs={
            "conversation_id": request.conversation_id,
            "message_id": message_id
        }
    )
    redis.rpush(f"conversation:{request.conversation_id}",
                json.dumps(human_message.dict(include={'content', 'additional_kwargs', 'type'})))

    history = get_all_messages(request.conversation_id, "conversation")
    history = list(map(lambda x: HumanMessage.parse_obj(x) if x["type"] == "human" else AIMessage.parse_obj(x), history))

    result = await chain.ainvoke({"messages": history})
    result.additional_kwargs = {
            "conversation_id": request.conversation_id,
            "message_id": response_id
        }

    redis.rpush(f"conversation:{request.conversation_id}",
                json.dumps(result.dict(include={'content', 'additional_kwargs', 'type'})))

    return Message(
        messageType="ai",
        conversationId=request.conversation_id,
        messageId=response_id,
        content=result.content
    )


@app.get("/conversation/{conversation_id}", tags=["Chat"], summary="Get chat history by conversation ID")
def get_messages(conversation_id: str) -> List[Message]:
    """
    Path Variables:

    - **conversationId**

    Returns: list of messages containing

    - list of **Message** objects
    """
    history = get_all_messages(conversation_id)
    history = map(lambda x: Message(
        content=x["content"],
        conversationId=x["additional_kwargs"]["conversation_id"],
        message_type=x["type"],
        messageId=x["additional_kwargs"]["message_id"] if "message_id" in x["additional_kwargs"] else None,
        lastMessageId=x["additional_kwargs"]["last_message_id"] if "last_message_id" in x["additional_kwargs"] else None
    ), history)
    return list(history)


@app.get("/docs", tags=["Docs"])
def read_docs():
    return get_swagger_ui_html(openapi_url="/openapi.json", title="AI Core API")
