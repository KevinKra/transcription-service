import { CssBaseline, styled } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import createEmotionCache from "../styles/createEmotionCache";
import { getDesignTokens } from "../styles/theme";
import withDarkMode from "next-dark-mode";
import { useDarkMode } from "next-dark-mode";
import { useMemo } from "react";
import TopNavBar from "../components/_molecules/TopNavBar/TopNavBar";
import SnackBar from "../components/_atoms/SnackBar/SnackBar";

const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  darkMode: { darkModeActive: boolean };
  emotionCache: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  darkMode,
  pageProps,
}: CustomAppProps) {
  const { darkModeActive } = darkMode;
  const mode = darkModeActive ? "dark" : "light";
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const {
    switchToDarkMode, // function - toggles the dark mode on
    switchToLightMode, // function - toggles the light mode on
  } = useDarkMode();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />;
      </Head>
      <MuiThemeProvider theme={theme}>
        <RootPageStyle>
          <CssBaseline />
          <TopNavBar
            switchToDarkMode={switchToDarkMode}
            switchToLightMode={switchToLightMode}
            darkModeActive={darkModeActive}
          />
          <Component {...pageProps} />
          <SnackBar />
        </RootPageStyle>
      </MuiThemeProvider>
    </CacheProvider>
  );
}
export default withDarkMode(MyApp);

const RootPageStyle = styled("div")`
  display: grid;
  grid-template-rows: auto 1fr auto;
  border: 1px dashed blue;
  min-height: 100vh;
`;
