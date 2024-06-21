import React, { useState, FormEvent } from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from './CustomButton';

interface QuestionWithAnswersProps {
  question: string;
  answers: string[];
  isMultiSelect: boolean;
  onSubmit: (selectedAnswers: number[]) => void;
  submit?: string
  mandatorySelection?: boolean
  forceDisabled?: boolean
}

const QuestionWithAnswers: React.FC<QuestionWithAnswersProps> = ({ question, answers, isMultiSelect, onSubmit, submit = "Povrdiť", mandatorySelection = true, forceDisabled = false }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false)

  const handleAnswerClick = (index: number) => {
    if (submit === "") {
      onSubmit([index])
    } else {
      if (isMultiSelect) {
        setSelectedAnswers(prev =>
          prev.includes(index) ? prev.filter(answerIndex => answerIndex !== index) : [...prev, index]
        );
      } else {
        setSelectedAnswers([index]);
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(mandatorySelection && selectedAnswers.length === 0)) {
        onSubmit(selectedAnswers);
        setDisabled(true)
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={2}>
      <Typography variant="subtitle1" gutterBottom>{question}</Typography>
      {/* <ReceiverMessage avatar={null}>{question}</ReceiverMessage> */}
      <Box display="flex" flexDirection="column" gap={1}>
        {answers.map((answer, index) => (
            <CustomButton
                selected={selectedAnswers.find(ele => ele === index) !== undefined}
                onClick={() => handleAnswerClick(index)}
                disabled={forceDisabled || disabled}
            >
                {answer}
            </CustomButton>
        ))}
      </Box>
      {submit !== "" &&
        <Box display="flex" justifyContent="flex-end" style={{ marginTop: '10px' }}>
          <CustomButton type="submit" disabled={forceDisabled || disabled}>
            {submit}
          </CustomButton>
        </Box>
      }
    </Box>
  );
};

export default QuestionWithAnswers;