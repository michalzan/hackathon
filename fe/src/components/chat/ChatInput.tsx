import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" alignItems="center" p={2}>
      <TextField
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleChange}
        placeholder="Napíšte svoju správu..."
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
        Poslať
      </Button>
    </Box>
  );
};

export default ChatInput;
