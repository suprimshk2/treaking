import { Link as RouteLink, useLocation } from 'react-router-dom';

import { Box, Typography, useTheme } from '@mui/material';
import { IPermission } from 'features/settings/roles-and-permissions/interfaces';
import * as BsIcons from 'react-icons/bs';

// interface IProps {
//   menu: {
//     name: string;
//     route: string;
//     icon: IconType;
//     activeIcon: IconType;
//   };
// }

interface IProps {
  menu: {
    code: string;
    icon: string;
    name: string;
    isMenu: boolean;
    order: number;
    permissions: IPermission[];
    routePath: string;
    activeIcon: string;
  };
}

type BsIconName = keyof typeof BsIcons;

function HeaderMenu({ menu }: IProps) {
  const theme = useTheme();
  const location = useLocation();

  const IconComponent = BsIcons[menu.icon as BsIconName] || BsIcons.BsFileExcel;
  // const ActiveIconComponent =
  //   BsIcons[menu.activeIcon as BsIconName] || BsIcons.BsFileExcel;

  const isActive = location.pathname === menu.routePath;

  const wrapperStyles = {
    textDecoration: 'none',
    color: isActive ? theme.palette.common.white : theme.palette.common.black,
    display: 'flex',
    backgroundColor: isActive ? theme.palette.secondary.main : 'transparent',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(3)} ${theme.spacing(6)}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    },
    borderRadius: 1,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  };

  // const Icon = isActive ? menu.activeIcon : menu.icon;

  return (
    <Box
      component={RouteLink}
      to={menu.routePath || ''}
      sx={wrapperStyles}
      title={menu.name}
    >
      <Box
        sx={{
          fontSize: theme.typography.bodyTextMedium.fontSize,
          [theme.breakpoints.up('sm')]: {
            marginRight: theme.spacing(2),
          },

          width: theme.spacing(5),
          height: theme.spacing(5),
        }}
      >
        {/* <Icon size={20} /> */}
        <IconComponent size={20} />
      </Box>
      <Typography
        variant="bodyTextMedium"
        sx={{
          [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
        }}
      >
        {menu.name}
      </Typography>
    </Box>
  );
}

export default HeaderMenu;
