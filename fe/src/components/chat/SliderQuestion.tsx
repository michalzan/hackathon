import { Box, Slider, TextField } from "@mui/material"
import { useState } from "react"
import CustomButton from "./CustomButton"

interface Props {
    question: string
    minValue: number
    maxValue: number
    submit: (value: number[]) => void
}

export const SliderQuestion: React.FC<Props> = ({question, minValue, maxValue, submit}) => {
    const [value, setValue] = useState<number[]>([minValue, maxValue])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };

    const handleSubmit = () => {
        submit(value)
    }

    return (
        <Box>
            <Box>{question}</Box>
            <Slider value={value} onChange={handleChange} min={minValue} max={maxValue} />
            <Box sx={{display: "flex"}}>
                <TextField value={value[0]} onChange={(v) => setValue([Number(v.target.value), value[1]])} />
                <TextField value={value[1]} onChange={(v) => setValue([value[0], Number(v.target.value)])} />
            </Box>
            <Box display="flex" justifyContent="flex-end" style={{ marginTop: '10px' }}>
                <CustomButton onClick={handleSubmit}>Potvrdiť</CustomButton>
            </Box>
        </Box>
    )
}