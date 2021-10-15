import { grey, pink } from "@mui/material/colors";
import { lighten, PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: pink[300],
    },
    secondary: {
      main: grey[800],
    },
    background: {
      paper: lighten(grey[100], 0.2),
    },
    ...(mode === "dark" && {
      primary: {
        main: pink[400],
      },
      secondary: {
        main: grey[900],
      },
      background: {
        default: grey[800],
        paper: lighten(grey[800], 0.2),
      },
    }),
    text: {
      // tbd
    },
  },
});
