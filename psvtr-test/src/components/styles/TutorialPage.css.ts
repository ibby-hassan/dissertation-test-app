import { style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 768px)';

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
  maxWidth: '60%',
  '@media': {
    [mobile]: {
      maxWidth: '95%',
      padding: '1rem',
    }
  }
})

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  '@media': {
    [mobile]: {
      fontSize: '1.5rem',
    }
  }
})

export const textBlock = style({
  fontSize: '1.1rem',
  textAlign: 'center',
  '@media': {
    [mobile]: {
      fontSize: '1rem',
    }
  }
})

// --- BUTTON LAYOUT ---
export const buttonRow = style({
  display: 'flex',
  gap: '1rem',
  marginTop: '1vh',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    [mobile]: {
      width: '100%',
      flexDirection: 'column-reverse', // Prev/Next order
    }
  }
});

const baseButton = style({
  padding: '12px 30px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '@media': {
    [mobile]: {
      width: '100%',
      padding: '15px'
    }
  }
});

export const nextButton = style([baseButton, {
  backgroundColor: '#3b82f6',
  color: 'white',
  ':hover': {
    backgroundColor: '#2563eb'
  }
}]);

export const prevButton = style([baseButton, {
  backgroundColor: '#e5e7eb', 
  color: '#374151',
  ':hover': {
    backgroundColor: '#d1d5db'
  }
}]);

export const startTestButton = style([baseButton, {
  backgroundColor: '#dc2626',
  color: 'white',
  ':hover': {
    backgroundColor: '#b91c1c'
  }
}]);