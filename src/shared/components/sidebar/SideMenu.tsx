import { Box, Typography, MenuList, Stack } from '@mui/material';
// import { settingsRoutes } from 'shared/constants/settings';
import { useBoundStore } from 'shared/stores/useBoundStore';
import SideMenuList from './SideMenuList';

export default function UserManagementRoute() {
  const authModules = useBoundStore.use.authModule();

  const filteredSettings = authModules?.modules?.find(
    (item: any) => item.code === 'SETTING'
  );

  return (
    <Box
      maxHeight="85vh"
      sx={{ overflowY: 'auto', overflowX: 'hidden' }}
      pl={4}
      pr={4}
      mt={3}
    >
      <Typography variant="h6">Settings</Typography>
      {filteredSettings && (
        <MenuList>
          <Stack spacing={1}>
            {filteredSettings?.subModules.map((item: any) => (
              <SideMenuList key={item.name} menu={item} />
            ))}
          </Stack>
        </MenuList>
      )}
    </Box>
  );
}
