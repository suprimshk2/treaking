import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import Logo from 'shared/components/display/Logo';
import layoutConstants from 'shared/constants/layout';
import { useBoundStore } from 'shared/stores/useBoundStore';
import LogoImg from 'shared/assets/png/LogoSecondary.png';
import HeaderMenuList from 'shared/components/header/HeaderMenuList';
import SidebarMenuList from './SideBarMenuList';

const { SIDEBAR_WIDTH_EXPANDED, SIDEBAR_LOGO_HEIGHT } = layoutConstants;

function Sidebar() {
  const theme = useTheme();
  const isLargerScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSidebarOpen = useBoundStore.use.isSidebarOpen();
  const toggleSidebar = useBoundStore.use.toggleSidebar();

  const drawerPaperStyles = {
    width: SIDEBAR_WIDTH_EXPANDED,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.customShadows.dropShadow2,
    borderRightStyle: 'none',
    transition: 'width 0.25s ease 0s',
    paddingX: theme.spacing(4),
  } as const;

  const onCloseDrawer = () => {
    toggleSidebar();
  };

  return (
    <Box className="sidebar" sx={{ padding: 3, backgroundColor: 'red' }}>
      <Drawer
        open={isSidebarOpen}
        onClose={onCloseDrawer}
        PaperProps={{
          sx: drawerPaperStyles,
        }}
        variant={isLargerScreen ? 'persistent' : 'temporary'}
      >
        <Box
          alignItems="center"
          display="flex"
          flexShrink={0}
          justifyContent="center"
          padding={theme.spacing(4)}
          height="auto"
        >
          <Box width="100%" sx={{}}>
            <Logo sx={{ height: SIDEBAR_LOGO_HEIGHT }} src={LogoImg} />
          </Box>
        </Box>
        <HeaderMenuList />
      </Drawer>
    </Box>
  );
}

export default Sidebar;
