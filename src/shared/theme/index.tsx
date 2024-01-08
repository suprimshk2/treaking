import React, { useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import componentsOverrides from './overrides';
import breakpoints from './breakpoints';
import palette from './palette';
import { spacing } from './spacing';
import typography from './typography';
import zIndex from './zIndexes';
import { shadows, customShadows } from './shadows';

interface Props {
  children: React.ReactNode;
}

function ThemeConfig({ children }: Props): JSX.Element {
  const themeOptions = useMemo(
    () => ({
      breakpoints,
      palette,
      spacing,
      typography,
      zIndex,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverrides(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ThemeConfig;
