import { Link as RouteLink, useLocation } from 'react-router-dom';

import { Box, Typography, useTheme } from '@mui/material';
import { IconType } from 'react-icons/lib';

interface IProps {
  menu: {
    name: string;
    route: string;
    icon: IconType;
    activeIcon: IconType;
  };
}

function SidebarMenu({ menu }: IProps) {
  const theme = useTheme();
  const location = useLocation();

  const isActive = location.pathname === menu.route;

  const wrapperStyles = {
    textDecoration: 'none',
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    borderRadius: 1,
    marginBottom: theme.spacing(1),
  };

  const Icon = isActive ? menu.activeIcon : menu.icon;
  return (
    <Box component={RouteLink} to={menu.route || ''} sx={wrapperStyles}>
      <Typography
        variant="bodyTextLarge"
        color={isActive ? 'primary.main' : 'common.white'}
      >
        {menu.name}
      </Typography>
    </Box>
  );
}

export default SidebarMenu;
