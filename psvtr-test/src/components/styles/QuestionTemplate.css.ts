import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '3vh',
  fontFamily: 'serif',
  flex: 1,
  padding: '3vh 0',
});

// --- ROW CONTAINERS ---
export const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2vw',
  flexWrap: 'nowrap'
});

export const optionsRow = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '2vw',
});

// --- TEXT ELEMENTS ---
export const connectorText = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#000',
  textTransform: 'capitalize',
  margin: '0 10px'
});


export const letterLabel = style({
  display: 'block',
  textAlign: 'center',
  marginBottom: '1vh',
  fontSize: '1.25rem',
  fontFamily: 'serif',
});

// --- IMAGES ---
export const shapeImage = style({
  maxHeight: '15vh',
  height: '100%',
  maxWidth: '100%',
  aspectRatio: '1/1',
  objectFit: 'contain',
  display: 'block'
});

// --- INTERACTIVE ELEMENTS ---
export const optionButton = style({
  background: 'none',
  border: '2px solid transparent',
  padding: '5px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff'
  },
  ':active': {
    transform: 'scale(0.98)'
  }
});