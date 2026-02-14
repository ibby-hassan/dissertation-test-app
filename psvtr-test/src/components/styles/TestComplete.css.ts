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