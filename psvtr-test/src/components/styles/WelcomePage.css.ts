// src/components/styles/WelcomePage.css.ts
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
})

export const title = style({
  fontSize: '3rem',
  fontWeight: 'bold',
})

export const text = style({
  fontSize: '1.2rem',
  lineHeight: '1.25rem',
  textAlign: 'center',
  maxWidth: '75%',
})

export const buttonContainer = style({
  display: 'flex',
  gap: '1rem',
})

const button = style({
  padding: '1.5vh 3vw',
  fontSize: '1.1rem',
  fontWeight: '600',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: 'white',
});

export const buttonA = style([button, {
  backgroundColor: '#2563eb',
  ':hover': { backgroundColor: '#1d4ed8' }
}]);

export const buttonB = style([button, {
  backgroundColor: '#059669',
  ':hover': { backgroundColor: '#047857' }
}]);

export const disclaimer = style({
  fontSize: '1.2rem',
  color: '#9ca3af',
});