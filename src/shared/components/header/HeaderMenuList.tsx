import { Stack } from '@mui/material';

import { useBoundStore } from 'shared/stores/useBoundStore';
import { ModuleCodes } from 'shared/enums';
import HeaderMenu from './HeaderMenu';
// import { TYPOGRAPHY } from 'shared/theme/constants/theme';

// Demo menus
// This will be removed later when menus are driven by db

function HeaderMenuList() {
  const authModules = useBoundStore.use.authModule();

  return (
    <Stack direction="row" spacing={1}>
      {authModules?.modules
        ?.filter(
          (item: any) =>
            item.code !== ModuleCodes.SETTING &&
            item.code !== ModuleCodes.NOTIFICATION
        )
        .map((item: any) => <HeaderMenu key={item.name} menu={item} />)}
    </Stack>
  );
}

export default HeaderMenuList;
