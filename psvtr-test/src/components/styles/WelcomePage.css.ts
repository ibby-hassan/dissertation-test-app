// src/components/styles/WelcomePage.css.ts
import { style, globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: 0,
  padding: 0,
  backgroundColor: '#f9fafb',
  color: '#1f2937'
});

export const container = style({
  maxWidth: '600px',
  margin: '0 auto',
  padding: '60px 20px',
  textAlign: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const title = style({
  fontSize: '2.5rem',
  fontWeight: '800',
  marginBottom: '1.5rem',
  color: '#111827',
  letterSpacing: '-0.025em',
});

export const infoCard = style({
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  border: '1px solid #e5e7eb',
  textAlign: 'left',
  marginBottom: '32px',
});

export const infoText = style({
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#4b5563',
  marginBottom: '24px',
});

export const label = style({
  display: 'block',
  marginBottom: '8px',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: '#374151',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const select = style({
  width: '100%',
  padding: '12px 16px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '2px solid #e5e7eb',
  backgroundColor: '#f9fafb',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
  outline: 'none',
  ':focus': {
    borderColor: '#3b82f6',
    backgroundColor: '#fff',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  }
});

export const buttonGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

// Base button style
const buttonBase = style({
  padding: '16px',
  fontSize: '1rem',
  fontWeight: '600',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: 'white',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  ':active': {
    transform: 'translateY(0)',
  }
});

export const buttonA = style([buttonBase, {
  backgroundColor: '#2563eb', // Blue
  ':hover': { backgroundColor: '#1d4ed8' }
}]);

export const buttonB = style([buttonBase, {
  backgroundColor: '#059669', // Green
  ':hover': { backgroundColor: '#047857' }
}]);

export const tagline = style({
  marginTop: '32px',
  fontSize: '0.875rem',
  color: '#9ca3af',
  fontStyle: 'italic',
});