import { Chip as MuiChip } from '@mui/material';
import { toTitleCase } from 'shared/utils/misc';

interface IProps {
  label: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  className?: string;
  size?: 'small' | 'medium';
}
function Chip({ label, color, className, size }: IProps) {
  return (
    <MuiChip
      label={toTitleCase(label)}
      color={color}
      sx={{ cursor: 'pointer' }}
      className={className}
      size={size}
    />
  );
}

Chip.defaultProps = {
  color: 'primary',
  className: '',
  size: 'medium',
};
export default Chip;
