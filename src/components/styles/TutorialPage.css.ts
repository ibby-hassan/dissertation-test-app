import { style } from '@vanilla-extract/css';

const mobile = 'screen and (max-width: 768px)';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'serif',
  gap: '1.5vh',
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
  maxWidth: '60%',
  '@media': {
    [mobile]: {
      maxWidth: '90%',
      padding: '2vh 0',
      borderRadius: '0',
      boxShadow: 'none',
      border: 'none',
      marginTop: 'auto', 
      marginBottom: 'auto',
      minHeight: 'auto',
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
  fontSize: '1.15rem',
  textAlign: 'center',
  '@media': {
    [mobile]: {
      fontSize: '0.9rem',
      lineHeight: '1.4'
    }
  }
})

export const buttonRow = style({
  display: 'flex',
  gap: '1rem',
  marginTop: '1vh',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    [mobile]: {
      width: '100%',
      flexDirection: 'column-reverse', 
      marginTop: '2vh',
      gap: '2vh',
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
      padding: '12px'
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