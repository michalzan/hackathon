import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CustomButton from './CustomButton';

interface CarouselProps {
  images: string[];
  showImages: boolean
  onSubmit: (index: number) => void;
  disabled: boolean
}

const Carousel: React.FC<CarouselProps> = ({ images, showImages, onSubmit, disabled }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showImages) {
        setSelectedIndex(-1)
    }
  }, [showImages])

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 100; // Adjust scroll amount as needed
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      onSubmit(selectedIndex);
    } else {
        onSubmit(-1)
    }
  };

  return (
    <Box textAlign="center">
      {showImages && <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <IconButton onClick={() => handleScroll('left')} disabled={disabled}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box
          ref={carouselRef}
          display="flex"
          overflow="auto"
          whiteSpace="nowrap"
          sx={{
            width: '80%',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => handleSelect(index)}
              sx={{
                display: 'inline-block',
                border: selectedIndex === index ? '2px solid blue' : '2px solid transparent',
                borderRadius: '8px',
                padding: '5px',
                margin: '10px',
                cursor: 'pointer',
                '&:hover': {
                  border: '2px solid blue',
                },
              }}
            >
              <img
                src={image}
                alt={`thumbnail-${index}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                }}
              />
            </Box>
          ))}
        </Box>
        <IconButton onClick={() => handleScroll('right')} disabled={disabled}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>}
      <Box display="flex" justifyContent="flex-end" style={{ marginTop: '10px' }}>
        <CustomButton
            onClick={handleSubmit}
            style={{ marginTop: '10px' }}
            disabled={disabled}
        >
            Potvrdiť
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Carousel;
