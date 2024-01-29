import { Stack, useTheme } from '@mui/material';
import { CenterRowSpaceBetween } from 'shared/components/layouts/CenterRowSpaceBetween';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsPlusLg } from 'react-icons/bs';

interface IProps {
  onAddClick: VoidFunction;
}

export function ProductTableBanner({ onAddClick }: IProps) {
  const theme = useTheme();
  return (
    <Stack spacing={4} mb={4} alignItems="flex-end">
      <CenterRowSpaceBetween>
        <Button
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.CONTAINED}
          suffix={<BsPlusLg />}
          buttonType={ButtonType.NORMAL}
          onClick={onAddClick}
          sx={{ color: theme.palette.common.black }}
        >
          Add Product
        </Button>
      </CenterRowSpaceBetween>
    </Stack>
  );
}
