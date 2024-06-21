import { Box } from "@mui/material"
import { useState } from "react"
import QuestionWithAnswers from "./QuestionWithAnswers"
import { BrandSelect } from "./BrandSelect"
import { SliderQuestion } from "./SliderQuestion"

interface IntroFormProps {
    submit: (result: string) => void
}

const questions = [
    {
        question: "Rád ti pomôžem s výberom tvojho nového auta.",
        answers: []
    },
    {
        question: "Ako často budem auto používať?",
        answers: ["Denne", "Niekoľkrát do týždňa", "Nepravidelne"]
    },
    {
        question: "Na čo budem auto najčastejšie používať?",
        answers: ["Výlučne iba pracovné účely", "Práca/rodina", "Iba rodinné účely"]
    },
    {
        question: "Čo je pre mňa pri výbere auta dôležité?",
        answers: ["Pohodlie", "Veľkosť Priestoru", "Bezpečnosť"]
    },
    {
        question: "Aký typ jazdy ma najviac baví? (Aký typ jazdy preferuješ)",
        answers: ["Športová a dynamická jazda", "Pokojná a komfortná jazda", "Kombinácia oboch, podľa nálady"]
    },
    {
        question: "Budem auto používať na dlhé vzdialenosti alebo skôr na krátke trasy?",
        answers: ["Väčšinou krátke trasy (mesto, okolie)", "Väčšinou dlhé vzdialenosti (diaľnice, dlhé cesty)", "Kombinácia oboch"]
    }
]

let result = ""

export const IntroForm: React.FC<IntroFormProps> = ({submit}) => {
    const [answerLevel, setAnswerLevel] = useState(0)

    const handleMultiselect = (answers: number[]) => {
        if (answerLevel > 0) {
            result += questions[answerLevel].question
            result += "\n"
            let answersString = Array.from(answers.map((x) => questions[answerLevel].answers[x])).join(", ")
            result += answersString
            result += "\n"
        }
        setAnswerLevel(answerLevel+1)
    }

    const handleCarouselSelection = (selection: string) => {
        result += "Máš preferovanú značku?\n"
        if (selection === "") {
            result += "Nie\n"
        } else {
            result += selection
            result += "\n"
        }
        setAnswerLevel(answerLevel+1)
    }

    const handleSliderSubmit = (value: number[]) => {
        result += "Aký máš rozpočet?\nOd " + value[0] + " do " + value[1]
        setAnswerLevel(answerLevel+1)
        submit(result)
    }

    return (
        <Box sx={{paddingBottom: "16px"}}>
            <QuestionWithAnswers
                question="Rád ti pomôžem s výberom tvojho nového auta."
                answers={[]}
                isMultiSelect={false}
                onSubmit={handleMultiselect}
                submit="Poďme na to!"
                mandatorySelection ={false}
            />
            {answerLevel > 0 && <QuestionWithAnswers
                question="Ako často budeš auto používať?"
                answers={["Denne", "Niekoľkrát do týždňa", "Nepravidelne"]}
                isMultiSelect={false}
                onSubmit={handleMultiselect}
            />}
            {answerLevel > 1 && <QuestionWithAnswers
                question="Na čo budeš auto najčastejšie používať?"
                answers={["Výlučne iba pracovné účely", "Práca/rodina", "Iba rodinné účely"]}
                isMultiSelect={false}
                onSubmit={handleMultiselect}
            />}
            {answerLevel > 2 && <QuestionWithAnswers
                question="Čo je pre teba pri výbere auta dôležité?"
                answers={["Pohodlie", "Veľkosť Priestoru", "Bezpečnosť"]}
                isMultiSelect={true}
                onSubmit={handleMultiselect}
            />}
            {answerLevel > 3 && <QuestionWithAnswers
                question="Aký typ jazdy ťa najviac baví? (Aký typ jazdy preferuješ)"
                answers={["Športová a dynamická jazda", "Pokojná a komfortná jazda", "Kombinácia oboch, podľa nálady"]}
                isMultiSelect={false}
                onSubmit={handleMultiselect}
            />}
            {answerLevel > 4 && <QuestionWithAnswers
                question="Budeš auto používať na dlhé vzdialenosti alebo skôr na krátke trasy?"
                answers={["Väčšinou krátke trasy (mesto, okolie)", "Väčšinou dlhé vzdialenosti (diaľnice, dlhé cesty)", "Kombinácia oboch"]}
                isMultiSelect={false}
                onSubmit={handleMultiselect}
            />}
            {answerLevel > 5 && <BrandSelect text={"Máš preferovanú značku?"} onSelect={handleCarouselSelection}></BrandSelect>}
            {answerLevel > 6 && <SliderQuestion question="Aký máš rozpočet?" minValue={12000} maxValue={100000} submit={handleSliderSubmit}></SliderQuestion>}
        </Box>
    )
}