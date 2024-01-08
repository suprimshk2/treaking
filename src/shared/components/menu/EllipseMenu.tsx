import { BsThreeDotsVertical } from 'react-icons/bs';
import { Box, List } from '@mui/material';
import Popover from 'shared/theme/components/Popover';

interface IProps {
  children: React.ReactNode;
  open?: boolean;
}

function EllipseMenu({ children, open }: IProps): JSX.Element {
  return (
    <Popover
      buttonIcon={BsThreeDotsVertical}
      open={open}
      sx={{
        minWidth: 180,
      }}
      buttonSize="small"
    >
      <Box>
        <List className="MuiPopover-list compact">{children}</List>
      </Box>
    </Popover>
  );
}

EllipseMenu.defaultProps = {
  open: false,
};

export default EllipseMenu;
