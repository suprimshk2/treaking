import { Box } from '@mui/material';

import { SETTINGS_BAR_PROPERTY } from 'shared/constants/settings';

interface IProps {
  children: JSX.Element;
  sideBarWidth?: string;
  withAsideBar?: boolean;
}
const { DRAWER_WIDTH, ASIDE_BAR_WIDTH } = SETTINGS_BAR_PROPERTY;

export function SideBarDetailLayout({
  sideBarWidth,
  children,
  withAsideBar,
}: IProps) {
  // const width = `calc(${DRAWER_WIDTH} + 114px)`;
  return (
    <Box ml={sideBarWidth} mr={withAsideBar ? ASIDE_BAR_WIDTH : undefined}>
      {children}
    </Box>
  );
}

SideBarDetailLayout.defaultProps = {
  sideBarWidth: DRAWER_WIDTH,
  withAsideBar: false,
};
