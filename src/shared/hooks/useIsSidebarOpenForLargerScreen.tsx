import { useMediaQuery, useTheme } from '@mui/material';
import { useBoundStore } from 'shared/stores/useBoundStore';

function useIsSidebarOpenForLargerScreen() {
  const theme = useTheme();
  const isLargerScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSidebarOpen = useBoundStore.use.isSidebarOpen();

  return isLargerScreen && isSidebarOpen;
}

export default useIsSidebarOpenForLargerScreen;
