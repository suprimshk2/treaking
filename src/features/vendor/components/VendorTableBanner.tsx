import { Box, Stack } from '@mui/material';
import { CenterRowSpaceBetween } from 'shared/components/layouts/CenterRowSpaceBetween';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsPlusLg } from 'react-icons/bs';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { SearchInput } from 'shared/theme/components/SearchInput';
import { useState } from 'react';

interface IProps {
  onAddClick: VoidFunction;
}

export function VendorTableBanner({ onAddClick }: IProps) {
  const [value, setValue] = useState('');

  const setUserTableFilters = useBoundStore.use.setVendorTableFilters();

  return (
    <Stack spacing={4} mb={4} alignItems="flex-end">
      <CenterRowSpaceBetween>
        <Stack direction="row" spacing={4}>
          {/* <Box display="flex" alignItems="center">
            <SearchInput
              placeholder="Search"
              value={value}
              onChangeHandler={(v) => setValue(v)}
              onDebouncedChangeHandler={(v) =>
                setUserTableFilters({ keyword: v })
              }
            />
          </Box> */}
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.CONTAINED}
            prefix={<BsPlusLg />}
            buttonType={ButtonType.NORMAL}
            onClick={onAddClick}
          >
            Add Vendor
          </Button>
        </Stack>
      </CenterRowSpaceBetween>
    </Stack>
  );
}
