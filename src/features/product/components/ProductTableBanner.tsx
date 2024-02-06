import { Box, Stack, useTheme } from '@mui/material';
import { CenterRowSpaceBetween } from 'shared/components/layouts/CenterRowSpaceBetween';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsPlusLg } from 'react-icons/bs';
import { SearchInput } from 'shared/theme/components/SearchInput';
import { useState } from 'react';
import { useBoundStore } from 'shared/stores/useBoundStore';

interface IProps {
  onAddClick: VoidFunction;
}

export function ProductTableBanner({ onAddClick }: IProps) {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const setProductTableFilters = useBoundStore.use.setProductTableFilters();

  return (
    <Stack spacing={4} mb={4}>
      <CenterRowSpaceBetween>
        <Box display="flex" alignItems="center">
          <SearchInput
            placeholder="Search"
            value={value}
            onChangeHandler={(v) => setValue(v)}
            onDebouncedChangeHandler={(v) => {
              setProductTableFilters({ keyword: v });
            }}
          />
        </Box>
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
