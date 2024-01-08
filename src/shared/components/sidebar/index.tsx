import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { SETTINGS_BAR_PROPERTY } from 'shared/constants/settings';
import { Drawer } from 'shared/theme/components/Drawer';
import SideMenu from './SideMenu';

export default function SideMenuLayout() {
  const { DRAWER_WIDTH } = SETTINGS_BAR_PROPERTY;

  return (
    <Box ml={DRAWER_WIDTH}>
      <Drawer>
        <SideMenu />
      </Drawer>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
