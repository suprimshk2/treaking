import { Outlet, useLocation } from 'react-router-dom';

import { Box, useTheme } from '@mui/material';

import layoutConstants from 'shared/constants/layout';
import uiRoute from 'shared/constants/uiRoute';
import { useMemo } from 'react';
import { Role } from 'shared/enums';
import { useGetRole } from 'shared/utils/store';
import Header from './Header';

const { HEADER_HEIGHT } = layoutConstants;

const NO_PADDING_ROUTES: string[] = [
  uiRoute.profile.profile,
  uiRoute.profile.profileSecurity,
  uiRoute.dashboard,
];

const ONLY_PADDING_X_ROUTES: string[] = [];

const ONLY_PADDING_Y_ROUTES: string[] = [];

function DashboardLayout() {
  const location = useLocation();
  const theme = useTheme();
  const role = useGetRole();
  // const isSidebarOpenForLargerScreen = useIsSidebarOpenForLargerScreen();

  const contentWrapperStyles = {
    paddingTop: HEADER_HEIGHT,
    // paddingLeft: isSidebarOpenForLargerScreen ? SIDEBAR_WIDTH_EXPANDED : 0,
  };

  const layoutPadding = useMemo(() => {
    if (
      role?.code === Role.REPRESENTATIVE &&
      NO_PADDING_ROUTES.includes(uiRoute.dashboard)
    ) {
      NO_PADDING_ROUTES.pop();
    }
    if (NO_PADDING_ROUTES.includes(location.pathname)) return 0;
    if (ONLY_PADDING_Y_ROUTES.includes(location.pathname))
      return `${theme.spacing(4)} 0`;
    if (ONLY_PADDING_X_ROUTES.includes(location.pathname))
      return `0 ${theme.spacing(4)}`;
    return theme.spacing(4);
  }, [location.pathname, theme, role]);

  return (
    <Box>
      <Header />
      {/* <Sidebar /> */}
      <Box sx={contentWrapperStyles}>
        <Box sx={{ padding: layoutPadding }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
