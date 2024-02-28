import { Stack } from '@mui/material';

import { useBoundStore } from 'shared/stores/useBoundStore';
import { ModuleCodes } from 'shared/enums';
import HeaderMenu from './HeaderMenu';
// import { TYPOGRAPHY } from 'shared/theme/constants/theme';

// Demo menus
// This will be removed later when menus are driven by db

function HeaderMenuList() {
  const authModules = [
    {
      name: 'About Us',
      code: 'ABOUT_US',
    },
    {
      name: 'Tesmonials',
      code: 'TESMONIALS',
    },
    {
      name: 'footer',
      code: 'FOOTER',
    },
    {
      name: 'About Us',
      code: 'ABOUT_US',
    },
  ];

  return (
    <Stack spacing={1}>
      {authModules.map((item: any) => (
        <HeaderMenu key={item.name} menu={item} />
      ))}
    </Stack>
  );
}

export default HeaderMenuList;
