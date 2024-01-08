import { Stack, Typography } from '@mui/material';
import {
  BsBuilding,
  BsHouseDoorFill,
  BsJournalMedical,
  BsReceiptCutoff,
} from 'react-icons/bs';
import uiRoute from 'shared/constants/uiRoute';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { ModuleCodes } from 'shared/enums';
import HeaderMenu from './HeaderMenu';
// import { TYPOGRAPHY } from 'shared/theme/constants/theme';

// Demo menus
// This will be removed later when menus are driven by db
const MENUS = [
  {
    name: 'Dashboard',
    route: uiRoute.dashboard,
    icon: BsHouseDoorFill,
    activeIcon: BsHouseDoorFill,
  },
  {
    name: 'Claims',
    route: uiRoute.claims,
    icon: BsJournalMedical,
    activeIcon: BsJournalMedical,
  },
  // {
  //   name: 'Queue',
  //   route: uiRoute.queue,
  //   icon: BsListCheck,
  //   activeIcon: BsListCheck,
  // },
  {
    name: 'Payments',
    route: uiRoute.payment,
    icon: BsReceiptCutoff,
    activeIcon: BsReceiptCutoff,
  },
  {
    name: 'Company',
    route: uiRoute.companies,
    icon: BsBuilding,
    activeIcon: BsBuilding,
  },

  // {
  //   name: 'Signature Companies',
  //   route: '',
  //   icon: BsPersonCheckFill,
  //   activeIcon: BsFillPersonCheckFill,
  // },
];

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
        .map((item: any) => (
          <HeaderMenu key={item.name} menu={item} />
        ))}
    </Stack>
  );
}

export default HeaderMenuList;
