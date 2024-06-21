import { Box, SxProps, Theme } from "@mui/material"
import { Chat } from "./components/chat/Chat"

export const HomePage: React.FC = () => {
    return (
        <Box sx={styles.background}>
            <Box>Open the chat by clicking on the black rectangle on the bottom right.</Box>
            <Chat />
        </Box>
    )
}

const styles: Record<'background', SxProps<Theme>> = {
    'background': {
        margin: '20px',
        height: '100vh',
    }
}