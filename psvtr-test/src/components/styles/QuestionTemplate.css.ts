// src/components/styles/QuestionTemplate.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center', 
  gap: '2vh',
  fontFamily: 'serif',
  flex: 1,
  padding: '2vh 0',
});

// Constants for layout stability
const ROW_HEIGHT = '16vh';
const IMAGE_SIZE = '14vh';

// --- ROW CONTAINERS ---
export const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1vw',
  flexWrap: 'nowrap',
  height: ROW_HEIGHT,
  width: '100%',
});

export const optionsRow = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '1.5vw',
  marginTop: '2vh',
  minHeight: `calc(${IMAGE_SIZE} + 4vh)`,
});

// --- TEXT ELEMENTS ---
export const connectorText = style({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#000',
  textTransform: 'uppercase', 
  margin: '0 0.5vw',
  whiteSpace: 'nowrap',
});

export const letterLabel = style({
  display: 'block',
  textAlign: 'center',
  marginBottom: '0.5vh',
  fontSize: '1.1rem',
  fontFamily: 'serif',
  fontWeight: 'bold',
});

// --- IMAGES ---
export const shapeImage = style({
  height: IMAGE_SIZE,
  width: IMAGE_SIZE,
  objectFit: 'contain',
  display: 'block',
  backgroundColor: 'transparent', 
  flexShrink: 0,
});

// --- PLACEHOLDERS ---
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
});

// --- INTERACTIVE ELEMENTS ---
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
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff'
  },
  ':active': {
    transform: 'scale(0.98)'
  }
});