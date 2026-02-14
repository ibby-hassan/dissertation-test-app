import { style, keyframes } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 768px)';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2vh 5vw',
  boxSizing: 'border-box',
  gap: '3vh',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  '@media': {
    [mobile]: {
      padding: '1vh 1rem',
      justifyContent: 'flex-start',
      minHeight: 'auto',
    }
  }
});

export const header = style({
  textAlign: 'center',
  marginBottom: '1vh',
});

export const questionNumber = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#374151',
  margin: 0,
  fontFamily: 'serif',
  '@media': {
    [mobile]: {
      fontSize: '1.5rem'
    }
  }
});

export const subText = style({
  fontSize: '1.3rem',
  color: '#9ca3af',
  marginTop: '0.5vh',
  fontFamily: 'serif',
  '@media': {
    [mobile]: {
      fontSize: '1rem'
    }
  }
});

export const footer = style({
  marginTop: '2vh',
  marginBottom: '2vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  '@media': {
    [mobile]: {
      width: '100%',
    }
  }
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
  },
  '@media': {
    [mobile]: {
      width: '100%',
      padding: '15px'
    }
  }
});

export const skipButton = style({
  background: 'none',
  border: 'none',
  color: '#9ca3af',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '5px',
  ':hover': {
    color: '#4b5563',
  }
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const loaderContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 0',
  width: '100%',
});

export const spinner = style({
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #3b82f6',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  animation: `${spin} 1s linear infinite`,
  marginBottom: '1rem',
});

export const loadingText = style({
  color: '#6b7280',
  fontSize: '1.1rem',
  fontFamily: 'sans-serif',
});