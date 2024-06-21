import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomButtonProps extends ButtonProps {
  selected?: boolean;
}

const StyledButton = styled(Button)<CustomButtonProps>(({ theme, selected }) => ({
  borderRadius: '15px',
  textTransform: 'none',
  color: selected ? theme.palette.primary.main : '#555',
  backgroundColor: selected ? '#f5f5f5' : '#fff',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid #ddd',
  boxShadow: selected ? `0 0 0 1px ${theme.palette.primary.main}` : 'none',
  '&:hover': {
    backgroundColor: selected ? '#f5f5f5' : '#f9f9f9',
  },
}));

const CustomButton: React.FC<CustomButtonProps> = ({ selected = false, ...props }) => {
  return <StyledButton selected={selected} {...props} />;
};

export default CustomButton;