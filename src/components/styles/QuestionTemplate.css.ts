// src/components/styles/QuestionTemplate.css.ts
import { style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 768px)';

// ... (container, row, optionsRow, connectorText, letterLabel, shapeImage, questionMarkPlaceholder remain the same)

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center', 
  gap: '2vh',
  fontFamily: 'serif',
  padding: '1vh 0',
  minHeight: '40vh', 
  '@media': {
    [mobile]: {
      gap: '2vh'
    }
  }
});

const ROW_HEIGHT = '16vh';
const IMAGE_SIZE = '14vh';

export const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1vw',
  flexWrap: 'nowrap',
  height: ROW_HEIGHT,
  width: '100%',
  '@media': {
    [mobile]: {
      height: 'auto', 
      gap: '2vw',
      padding: '1vh 0',
    }
  }
});

export const optionsRow = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '1.5vw',
  marginTop: '2vh',
  minHeight: `calc(${IMAGE_SIZE} + 4vh)`,
  '@media': {
    [mobile]: {
      flexWrap: 'wrap',
      gap: '15px',
      marginTop: '3vh',
    }
  }
});

export const connectorText = style({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#000',
  textTransform: 'uppercase', 
  margin: '0 0.5vw',
  whiteSpace: 'nowrap',
  '@media': {
    [mobile]: {
      fontSize: '0.9rem',
      margin: '0 5px',
      whiteSpace: 'normal',
      textAlign: 'center'
    }
  }
});

export const letterLabel = style({
  display: 'block',
  textAlign: 'center',
  marginBottom: '0.5vh',
  fontSize: '1.1rem',
  fontFamily: 'serif',
  fontWeight: 'bold',
});

export const shapeImage = style({
  height: IMAGE_SIZE,
  width: IMAGE_SIZE,
  objectFit: 'contain',
  display: 'block',
  backgroundColor: 'transparent', 
  flexShrink: 0,
  '@media': {
    [mobile]: {
      width: '22vw', 
      height: '22vw',
      maxHeight: '120px',
      maxWidth: '120px',
    }
  }
});

export const questionMarkPlaceholder = style({
  height: IMAGE_SIZE,
  width: IMAGE_SIZE,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#cbd5e1',
  border: '2px dashed #cbd5e1', 
  borderRadius: '10px',
  flexShrink: 0,
  '@media': {
    [mobile]: {
      width: '22vw',
      height: '22vw',
      maxHeight: '120px',
      maxWidth: '120px',
      fontSize: '2rem',
    }
  }
});

// INTERACTIVE BUTTON (Used in TestPage)
export const optionButton = style({
  background: 'none',
  border: '2px solid transparent',
  padding: '0.5vh',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  ':hover': {
    borderColor: '#93c5fd',
    backgroundColor: '#f8fafc'
  },
  ':active': {
    transform: 'scale(0.98)'
  }
});

export const readOnlyOptionButton = style({
  background: 'none',
  border: '2px solid transparent',
  padding: '0.5vh',
  borderRadius: '8px',
  cursor: 'default',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const selectedOptionButton = style([optionButton, {
  borderColor: '#2563eb',
  backgroundColor: '#eff6ff',
  transform: 'scale(1.02)',
  boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)'
}]);