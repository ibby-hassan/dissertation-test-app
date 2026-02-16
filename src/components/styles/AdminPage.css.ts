import { style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 768px)';

export const container = style({
  width: '100%',
  maxWidth: '900px', 
  margin: '2rem auto',
  padding: '1.5rem', 
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  boxSizing: 'border-box', 
  '@media': {
    [mobile]: {
      width: '100%',
      margin: '0',
      borderRadius: '0',
      padding: '1rem',
      boxShadow: 'none',
      overflowX: 'hidden' 
    }
  }
});

export const header = style({
  fontSize: '1.5rem', 
  fontWeight: 'bold',
  marginBottom: '1.5rem',
  borderBottom: '1px solid #e5e7eb',
  paddingBottom: '0.5rem',
  color: '#111827',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const sectionTitle = style({
  fontSize: '1.1rem', 
  fontWeight: '600',
  marginBottom: '0.75rem',
  color: '#374151',
  marginTop: '1.5rem',
  borderLeft: '4px solid #2563eb',
  paddingLeft: '0.5rem'
});

export const grid = style({
  display: 'grid',
  // Min size reduced to 150px to fit better on small screens
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
  gap: '1rem',
  marginBottom: '1rem',
  width: '100%',
  // Explicitly ensure rows size to content
  gridAutoRows: 'auto',
  '@media': {
    [mobile]: {
      gridTemplateColumns: '1fr 1fr', 
      gap: '0.5rem'
    }
  }
});

export const card = style({
  backgroundColor: '#f9fafb',
  padding: '1rem', 
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  // REMOVED: height: '100%' -> This was causing the collapse
  justifyContent: 'center',
  transition: 'transform 0.1s',
  ':hover': {
    transform: 'translateY(-2px)',
    borderColor: '#d1d5db'
  }
});

export const cardLabel = style({
  fontSize: '0.75rem', 
  color: '#6b7280',
  marginBottom: '0.25rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontWeight: 600
});

export const cardValue = style({
  fontSize: '1.5rem', 
  fontWeight: 'bold',
  color: '#1f2937',
  lineHeight: '1.2'
});

export const cardSubValue = style({
    fontSize: '0.7rem',
    color: '#9ca3af',
    marginTop: '0.25rem'
});

export const refreshButton = style({
  padding: '0.5rem 1rem',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.85rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#1d4ed8'
  }
});

export const highlightGreen = style({ color: '#059669' });
export const highlightBlue = style({ color: '#2563eb' });
export const highlightPurple = style({ color: '#7c3aed' });