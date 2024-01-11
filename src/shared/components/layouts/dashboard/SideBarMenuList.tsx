import { Box } from '@mui/material';
import { BsQuestion, BsQuestionCircleFill } from 'react-icons/bs';
import SidebarMenu from './SidebarMenu';

// Demo menus
// This will be removed later when menus are driven by db
const MENUS = [
  //   {
  //     name: 'Dashboard',
  //     route: '/',
  //     icon: BsHouseDoor,
  //     activeIcon: BsHouseDoorFill,
  //   },
  {
    name: 'Quiz',
    route: '/',
    icon: BsQuestion,
    activeIcon: BsQuestionCircleFill,
  },
];

function SidebarMenuList() {
  return (
    <Box p={4} pt={2}>
      {MENUS.map((item) => (
        <SidebarMenu key={item.name} menu={item} />
      ))}
    </Box>
  );
}

export default SidebarMenuList;
