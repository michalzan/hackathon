import Carousel from "./Carousel"
import volkswagen from '../../images/logos/volkswagen.png'
import mercedes from '../../images/logos/mercedes.png'
import ford from '../../images/logos/ford.png'
import volvo from '../../images/logos/volvo.png'
import suzuki from '../../images/logos/suzuki.png'
import skoda from '../../images/logos/skoda.png'
import toyota from '../../images/logos/toyota.png'
import kia from '../../images/logos/kia.png'
import hyundai from '../../images/logos/hyundai.png'
import { Box } from "@mui/material"
import QuestionWithAnswers from "./QuestionWithAnswers"
import { useState } from "react"

interface BrandSelectProps {
    text: string
    onSelect: (selection: string) => void
}

const logos = [
    {
        name: "volkswagen",
        image: volkswagen
    },
    {
        name: "mercedes",
        image: mercedes
    },
    {
        name: "ford",
        image: ford
    },
    {
        name: "volvo",
        image: volvo
    },
    {
        name: "suzuki",
        image: suzuki
    },
    {
        name: "skoda",
        image: skoda
    },
    {
        name: "toyota",
        image: toyota
    },
    {
        name: "kia",
        image: kia
    },
    {
        name: "hyundai",
        image: hyundai
    }
]

export const BrandSelect: React.FC<BrandSelectProps> = ({text, onSelect}) => {
    const [prefered, setPrefered] = useState<number[]>([])
    const [showImages, setShowImages] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const handleCarouselSubmit = (index: number) => {
        setDisabled(true)
        if (index >= 0) {
            onSelect(logos[index].name)
        } else {
            onSelect("")
        }
    };

    const handleMultiselect = (answers: number[]) => {
        console.log(answers)
        setShowImages(prefered.find(ele => ele !== 0) !== undefined)
        setPrefered(answers)
    };

    return (
        <Box>
            <QuestionWithAnswers
                question={text}
                answers={["Áno", "Nie"]}
                isMultiSelect={false}
                onSubmit={handleMultiselect}
                submit=""
                mandatorySelection={false}
                forceDisabled={disabled}
            />
            <Carousel images={logos.map((logo) => logo.image)} showImages={showImages} onSubmit={handleCarouselSubmit} disabled={disabled} />
        </Box>
    )
}