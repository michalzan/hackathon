import { Box, Button, LinearProgress, SxProps, TextField, Theme } from "@mui/material"
import { useEffect, useState } from "react"
import { YesNoQuestion } from "./YesNoQuestion"
import { SliderQuestion } from "./SliderQuestion"
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box"
import ChatInput from "./ChatInput"
import { fetchRequest } from "../../utils/fetchAPI"
import { IntroForm } from "./IntroForm"

interface ChatMessage {
    content: string
    messageType: "ai" | "human"
    conversationId: string
    messageId?: string
}

export const Chat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [conversationIdState, setConversationId] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        if (messages.length === 0) {
            setIsLoading(true)
            let response = await fetchRequest<ChatMessage>({path: "/init", method: "POST"})
            setConversationId(response.conversationId)
            setMessages([...messages, response])
            setIsLoading(false)
        }
    }

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const handleSendMessage = async (message: string) => {
        const message_object: ChatMessage = {
            content: message,
            conversationId: conversationIdState,
            messageType: "human"
        }
        let history = [...messages, message_object]
        setMessages(history)
        setIsLoading(true)
        let response = await fetchRequest<ChatMessage>({path: "/message", method: "POST", body: message_object})
        setIsLoading(false)
        setMessages([...history, response])
    }

    const formSubmit = async (result: string) => {
        const message_object: ChatMessage = {
            content: result,
            conversationId: conversationIdState,
            messageType: "human"
        }
        setIsLoading(true)
        let response = await fetchRequest<ChatMessage>({path: "/message", method: "POST", body: message_object})
        setIsLoading(false)
        console.log(response)
    }

    return (
        <Box sx={styles.window}>
            <Box sx={styles.header} onClick={toggleChat}>Chat with us!</Box>
            {isOpen && (
                <Box sx={styles.chat}>
                    {/* <YesNoQuestion question="Do you know what car do you want?" answers={["yes", "no"]} />
                    <SliderQuestion question="What is your expected budget?" minValue={0} maxValue={1000000} /> */}
                    {/* <Box sx={{ flex: 1, overflowY: 'auto' }}>
                        <ChatBox>
                        {messages.map((m, i) =>
                            m.messageType === "ai" ? (
                                    <ReceiverMessage key={i} avatar={null}>
                                        {m.content}
                                    </ReceiverMessage>
                                ) : (
                                    <SenderMessage key={i} avatar={null}>
                                        {m.content}
                                    </SenderMessage>
                                )
                            )}
                        </ChatBox>
                    </Box>
                    {isLoading && <LinearProgress
                        color="primary"
                        variant="query"
                        />}
                    <ChatInput onSubmit={handleSendMessage} /> */}
                    <IntroForm submit={formSubmit}/>
                    {isLoading && <LinearProgress
                        color="primary"
                        variant="query"
                        />}
                </Box>
            )}
        </Box>
    )
}

const styles: Record<'window' | 'header' | 'chat', SxProps<Theme>> = {
    'window': {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '300px',
        borderRadius: '4px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    },
    'header': {
        backgroundColor: 'black',
        height: '3em'
    },
    'chat': {
        backgroundColor: 'white',
        padding: '0.5em',
        minHeight: '6em',
        height: '500px',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
}