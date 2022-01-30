import { createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import palette from "./palette";
import {muiTypography as typography} from "./typography";
import components from "./components";
import { breakpoints, shape } from "./constants";

const theme = createTheme({
  palette,
  typography,
  components,
  breakpoints: {
    values: {
      ...breakpoints,
    },
  },
  shape,
});

export default theme;

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}