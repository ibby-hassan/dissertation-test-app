import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'sans-serif',
  gap: '3vh',
  backgroundColor: 'white',
  padding: '3rem',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
  maxWidth: '60%'
});

export const title = style({
  fontSize: '3rem',
  fontWeight: 'bold',
  marginBottom: '1vh',
});

export const text = style({
  fontSize: '1.2rem',
  lineHeight: '1.25rem',
  textAlign: 'center',
  maxWidth: '90%',
});

// --- INPUT STYLES ---
export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
  maxWidth: '45%',
  margin: '1vh 0',
});

export const label = style({
  fontSize: '1rem',
  fontWeight: '600',
  color: '#374151',
  textAlign: 'left',
});

export const input = style({
  padding: '12px',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  outline: 'none',
  transition: 'border-color 0.2s',
  ':focus': {
    borderColor: '#2563eb',
    boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)'
  }
});

export const helperText = style({
  fontSize: '1rem',
  color: '#6b7280',
  lineHeight: '1.4',
  marginTop: '0.2rem',
});

// --- BUTTONS ---
export const buttonContainer = style({
  display: 'flex',
  gap: '2rem',
});

const button = style({
  padding: '1.5vh 3vw',
  fontSize: '1.1rem',
  fontWeight: '600',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: 'white',
  ':disabled': {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
    transform: 'none'
  }
});

export const buttonA = style([button, {
  backgroundColor: '#2563eb',
  ':hover': { backgroundColor: '#1d4ed8' },
  selectors: { '&:disabled:hover': { backgroundColor: '#9ca3af' } }
}]);

export const buttonB = style([button, {
  backgroundColor: '#059669',
  ':hover': { backgroundColor: '#047857' },
  selectors: { '&:disabled:hover': { backgroundColor: '#9ca3af' } }
}]);

export const disclaimer = style({
  fontSize: '1rem',
  color: '#9ca3af',
});