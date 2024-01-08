import { createTheme } from '@mui/material/styles';

import componentsOverrides from '../theme/overrides';
import breakpoints from '../theme/breakpoints';
import { spacing } from '../theme/spacing';
import typography from '../theme/typography';
import palette from '../theme/palette';
import zIndex from '../theme/zIndexes';
import { shadows, customShadows } from '../theme/shadows';

const mockTheme = createTheme({
  breakpoints,
  palette,
  spacing,
  typography,
  zIndex,
  shadows,
  customShadows,
});
mockTheme.components = componentsOverrides(mockTheme);

export { mockTheme };
