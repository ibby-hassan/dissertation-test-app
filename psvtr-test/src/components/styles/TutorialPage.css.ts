// src/components/styles/TutorialPage.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'serif',
  gap: '1vh',
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
  maxWidth: '60%'
})

export const title = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
})

export const textBlock = style({
  fontSize: '1.2rem',
})

export const nextButton = style({
  marginTop: '1vh',
  padding: '12px 30px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#2563eb'
  }
});