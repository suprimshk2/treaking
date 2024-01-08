import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { IconType } from 'react-icons/lib';
import Checkbox from 'shared/theme/components/Checkbox';

interface IProps {
  icon: IconType;
  iconProps?: any;
  text: string;
  onClick?: VoidFunction | undefined;
  className?: string;
  showCheckbox?: boolean;
  checked?: boolean;
}

function EllipseMenuItem({
  icon,
  text,
  onClick,
  iconProps,
  className,
  showCheckbox,
  checked,
}: IProps) {
  const Icon = icon;
  return (
    <ListItem disablePadding onClick={onClick} className={className}>
      <ListItemButton>
        {showCheckbox && <Checkbox checked={checked} />}
        <ListItemIcon>
          <Icon {...iconProps} />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

EllipseMenuItem.defaultProps = {
  onClick: undefined,
  iconProps: undefined,
  className: undefined,
  showCheckbox: false,
  checked: false,
};

export default EllipseMenuItem;
