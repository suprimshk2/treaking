import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import layoutConstants from 'shared/constants/layout';
import { useBoundStore } from 'shared/stores/useBoundStore';
import Logo from 'shared/components/display/Logo';
import LogoImg from 'shared/assets/png/LogoSecondary.png';
import HeaderMenuList from 'shared/components/header/HeaderMenuList';

import { NavLink } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';
import { AccountPopover } from './AccountPopover';

const { HEADER_HEIGHT, HEADER_LOGO_HEIGHT } = layoutConstants;

function Header() {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const authData = useBoundStore.use.authData();

  // const isSidebarOpenForLargerScreen = useIsSidebarOpenForLargerScreen();
  // const toggleSidebar = useBoundStore.use.toggleSidebar();

  const appbarStyles = {
    height: HEADER_HEIGHT,
    backgroundColor: theme.palette.primary.main,
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
    // marginLeft: isSidebarOpenForLargerScreen ? SIDEBAR_WIDTH_EXPANDED : 0,
  };

  const avatarStyles = {
    bgColor: theme.palette.secondary.main,
  };

  return (
    <Box component={AppBar} sx={appbarStyles} className="no-print">
      <Toolbar sx={toolbarStyles}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            alignItems="center"
            display="flex"
            flexShrink={0}
            justifyContent="center"
            height="auto"
          >
            <Box
              component={NavLink}
              to={uiRoute.index}
              mr={8}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }}
            >
              <Logo sx={{ height: HEADER_LOGO_HEIGHT }} src={LogoImg} />
            </Box>
            <HeaderMenuList />
          </Box>
        </Box>
      </Toolbar>
    </Box>
  );
}

export default Header;
