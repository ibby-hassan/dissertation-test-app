import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2vh 5vw',
  boxSizing: 'border-box',
  gap: '2vh',
});

export const header = style({
  textAlign: 'center',
  marginBottom: '2vh',
});

export const questionNumber = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#374151',
  margin: 0,
  fontFamily: 'serif',
});

export const subText = style({
  fontSize: '1.3rem',
  color: '#9ca3af',
  marginTop: '0.5vh',
  fontFamily: 'serif',
});

export const footer = style({
  marginTop: '2vh',
  marginBottom: '4vh',
});

export const confirmButton = style({
  padding: '1.5vh 4vw',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#2563eb',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':disabled': {
    backgroundColor: '#cbd5e1',
    cursor: 'not-allowed',
  },
  ':hover': {
    backgroundColor: '#1d4ed8',
  },
  selectors: {
    '&:disabled:hover': {
      backgroundColor: '#cbd5e1',
    }
  }
});