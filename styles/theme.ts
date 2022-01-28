import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import createCache from '@emotion/cache';

// Tweak to your own color scheme.
export const Color = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY: '#BDBDBD',
  GREEN: '#5ECD91',
  PURPLE: '#5C29D4',
};

const theme = createTheme({
  palette: {
    primary: {
      main: Color.GREEN,
    },
    secondary: {
      main: Color.PURPLE,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}