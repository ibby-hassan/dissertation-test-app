import { globalStyle, style } from "@vanilla-extract/css";

const mobile = 'screen and (max-width: 768px)';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  minHeight: '100vh',
  width: '100%',
});

export const container = style({
  minHeight: '100vh',
  width: '100vw',
  overflowX: 'hidden',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  backgroundColor: '#f9fafb',
  color: '#1f2937',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', 
  
  '@media': {
    [mobile]: {
      backgroundColor: 'white',
      minHeight: '100vh',
      height: 'auto',
      display: 'flex',
      justifyContent: 'flex-start',
    }
  }
});