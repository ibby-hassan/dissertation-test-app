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

// --- NEW BUTTON LAYOUT ---
export const buttonRow = style({
  display: 'flex',
  gap: '1rem',
  marginTop: '1vh',
});

const baseButton = style({
  padding: '12px 30px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
});

export const nextButton = style([baseButton, {
  backgroundColor: '#3b82f6',
  color: 'white',
  ':hover': {
    backgroundColor: '#2563eb'
  }
}]);

export const prevButton = style([baseButton, {
  backgroundColor: '#e5e7eb', // Light gray
  color: '#374151',
  ':hover': {
    backgroundColor: '#d1d5db'
  }
}]);