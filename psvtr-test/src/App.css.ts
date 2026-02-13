import { globalStyle, style } from "@vanilla-extract/css";

// LOCK THE VIEWPORT
globalStyle('html, body', {
  margin: 0,
  padding: 0,
});

export const container = style({
  height: '100vh',
  width: '100vw',
  overflow: 'hidden', // No scrolling allowed
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  backgroundColor: '#f9fafb',
  color: '#1f2937',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle('br', {
  margin: '1vh',
});
  