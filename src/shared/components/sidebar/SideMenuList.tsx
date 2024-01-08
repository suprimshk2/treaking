import { Typography, MenuItem, useTheme } from '@mui/material';
import { IPermission } from 'features/settings/roles-and-permissions/interfaces';

import { useLocation, useNavigate } from 'react-router-dom';

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

export default function SideMenuList({ menu }: IProps) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === menu.routePath;

  const menuItemStyles = {
    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
    backgroundColor: isActive ? theme.palette.primary.lighter : null,
    '&:hover': {
      backgroundColor: theme.palette.primary.lighter,
      color: theme.palette.primary.main,
    },
    height: '36px',
    borderRadius: 1,
  };

  const navigateToRoute = (route: string) => {
    navigate(route);
  };

  return (
    <MenuItem
      sx={menuItemStyles}
      onClick={() => navigateToRoute(menu.routePath)}
    >
      <Typography pl={2} variant="bodyTextMedium">
        {menu.name}
      </Typography>
    </MenuItem>
  );
}
