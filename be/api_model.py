from typing import List, Optional, Literal
from pydantic import Field, BaseModel


class InitResponse(BaseModel):
    conversation_id: str = Field(alias="conversationId")
    init_message: str = Field(alias="initMessage")


class Message(BaseModel):
    content: str
    message_type: Optional[str] = Field(alias="messageType", default=None)
    conversation_id: str = Field(alias="conversationId")
    message_id: Optional[str] = Field(alias="messageId", default=None)
