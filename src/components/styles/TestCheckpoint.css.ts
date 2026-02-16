import { style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 768px)';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2vh',
  backgroundColor: 'white',
  padding: '3rem',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
  maxWidth: '50%',
  textAlign: 'center',
  fontFamily: 'sans-serif',
  '@media': {
    [mobile]: {
      maxWidth: '90%',
      padding: '2vh 1rem',
      borderRadius: '0',
      boxShadow: 'none',
      border: 'none',
      marginTop: 'auto',
      marginBottom: 'auto',
    }
  }
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#374151',
  marginBottom: '1vh',
  '@media': {
    [mobile]: {
      fontSize: '1.75rem'
    }
  }
});

export const text = style({
  fontSize: '1.1rem',
  color: '#4b5563',
  lineHeight: '1.6',
  marginBottom: '1vh',
  '@media': {
    [mobile]: {
      fontSize: '1rem'
    }
  }
});

export const progressHighlight = style({
  fontWeight: 'bold',
  color: '#2563eb',
});

export const button = style({
  marginTop: '2vh',
  padding: '1.5vh 3vw',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#2563eb',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#1d4ed8',
  },
  '@media': {
    [mobile]: {
      width: '100%',
      padding: '15px'
    }
  }
});