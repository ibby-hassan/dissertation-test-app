// src/components/styles/TestComplete.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  textAlign: 'center',
  fontFamily: 'sans-serif',
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#374151',
});

export const text = style({
  fontSize: '1.2rem',
  color: '#1f2937',
});

export const subText = style({
  fontSize: '1rem',
  color: '#6b7280',
  marginTop: '1rem',
});

export const restartButton = style({
  marginTop: '3rem',
  padding: '10px 20px',
  fontSize: '0.9rem',
  color: '#ef4444',
  backgroundColor: 'transparent',
  border: '1px solid #ef4444',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: '#fee2e2',
  }
});