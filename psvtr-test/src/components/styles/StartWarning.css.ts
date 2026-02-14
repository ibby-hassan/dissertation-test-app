import { style } from '@vanilla-extract/css';

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
});

export const title = style({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#dc2626',
  marginBottom: '1vh',
});

export const text = style({
  fontSize: '1.3rem',
  color: '#374151',
  lineHeight: '1.5',
});

export const boldText = style({
  fontWeight: 'bold',
  marginTop: '1vh',
});

export const buttonRow = style({
  display: 'flex',
  gap: '1rem',
  marginTop: '2vh',
});

const baseButton = style({
  padding: '12px 24px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
});

export const cancelButton = style([baseButton, {
  backgroundColor: '#e5e7eb',
  color: '#374151',
  ':hover': {
    backgroundColor: '#d1d5db'
  }
}]);

export const confirmButton = style([baseButton, {
  backgroundColor: '#dc2626',
  color: 'white',
  ':hover': {
    backgroundColor: '#b91c1c'
  }
}]);