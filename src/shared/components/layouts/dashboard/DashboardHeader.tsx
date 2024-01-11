import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BsList } from 'react-icons/bs';
import layoutConstants from 'shared/constants/layout';
import { useBoundStore } from 'shared/stores/useBoundStore';
import useIsSidebarOpenForLargerScreen from 'shared/hooks/useIsSidebarOpenForLargerScreen';
import { checkHeader } from 'shared/utils/common';
import { AccountPopover } from './AccountPopover';

const { HEADER_HEIGHT, SIDEBAR_WIDTH_EXPANDED } = layoutConstants;

function DashboardHeader() {
  const theme = useTheme();
  const location = useLocation();
  const authData = useBoundStore.use.authData();
  const isSidebarOpenForLargerScreen = useIsSidebarOpenForLargerScreen();
  const toggleSidebar = useBoundStore.use.toggleSidebar();

  const appbarStyles = {
    height: HEADER_HEIGHT,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.customShadows.dropShadow2,
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  };

  const toolbarStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '0px !important',
    height: '100%',
    padding: '0px !important',
    marginLeft: isSidebarOpenForLargerScreen ? SIDEBAR_WIDTH_EXPANDED : 0,
  };

  return (
    <Box component={AppBar} sx={appbarStyles}>
      <Toolbar sx={toolbarStyles}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" alignItems="center">
            <IconButton
              className="filled-white"
              aria-label="toggle-sidebar"
              size="medium"
              sx={{ marginRight: theme.spacing(4) }}
              type="button"
              onClick={() => toggleSidebar()}
            >
              <BsList />
            </IconButton>

            <Typography variant="h6">
              {checkHeader(location.pathname)?.title}
              {/* {(location.pathname === uiRoute.profile.profile ||
                location.pathname === uiRoute.profile.profileSecurity) &&
                'Profile'} */}
            </Typography>
          </Box>

          <AccountPopover
            // title="A"
            username={`${authData?.firstName} ${authData?.lastName}` || ''}
            // userRole="Developer "
            className="size-medium"
          />
        </Box>
      </Toolbar>
    </Box>
  );
}

export default DashboardHeader;
