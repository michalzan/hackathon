import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material"

interface Props {
    question: string
    answers: string[]
    handleClick: () => void
}

export const YesNoQuestion: React.FC<Props> = ({question, answers, handleClick}) => {
    return (
        <Box sx={{paddingBottom: "16px"}}>
            <Box sx={{paddingBottom: "8px"}}>{question}</Box>
            <Box sx={{display: "flex", gap: "8px"}}>
                <ToggleButtonGroup onChange={handleClick} orientation="vertical">
                {answers.map((answer) => {
                    return <ToggleButton value={answer} key={answer}>{answer}</ToggleButton>
                })}
                </ToggleButtonGroup>
            </Box>
        </Box>
    )
}