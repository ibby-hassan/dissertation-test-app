import { style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 768px)';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'sans-serif',
  gap: '2vh',
  backgroundColor: 'white',
  padding: '3rem',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
  maxWidth: '60%',
  textAlign: 'center',
  margin: 'auto',

  '@media': {
    [mobile]: {
      maxWidth: '90%',
      width: '100%',
      padding: '2vh 0',
      gap: '2vh',
      borderRadius: '0',
      boxShadow: 'none',
      border: 'none',
    }
  }
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1vh',
  color: '#1f2937'
});

export const text = style({
  fontSize: '1.1rem',
  lineHeight: '1.5rem',
  maxWidth: '90%',
  color: '#4b5563',
  marginBottom: '2vh',
});

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '400px',
});

const baseButton = style({
  padding: '1.5vh 2vw',
  fontSize: '1.1rem',
  fontWeight: '600',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  width: '100%',
  '@media': {
    [mobile]: {
      padding: '15px'
    }
  }
});

export const primaryButton = style([baseButton, {
  backgroundColor: '#2563eb',
  color: 'white',
  ':hover': { 
    backgroundColor: '#1d4ed8',
    transform: 'translateY(-2px)'
  },
}]);

export const secondaryButton = style([baseButton, {
  backgroundColor: '#f3f4f6',
  color: '#9ca3af',
  border: '1px solid #e5e7eb',
  ':hover': { 
    backgroundColor: '#e5e7eb', 
    color: '#6b7280' 
  },
}]);