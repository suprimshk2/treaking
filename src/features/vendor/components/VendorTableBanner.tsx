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
import { checkAuthForPermissions } from 'shared/utils/common';
import { ResourceCode } from 'shared/enums';
import { vendorManagementPermissions } from 'features/settings/roles-and-permissions/enums';

interface IProps {
  onAddClick: VoidFunction;
}

export function VendorTableBanner({ onAddClick }: IProps) {
  const [value, setValue] = useState('');

  const setUserTableFilters = useBoundStore.use.setVendorTableFilters();
  const isVendorCreateEnabled = checkAuthForPermissions(
    ResourceCode.VENDORS_MANAGEMENT,
    vendorManagementPermissions.CREATE
  );
  return (
    <Stack spacing={4} mb={4}>
      <CenterRowSpaceBetween>
        <Box display="flex" alignItems="center">
          <SearchInput
            placeholder="Search"
            value={value}
            onChangeHandler={(v) => setValue(v)}
            onDebouncedChangeHandler={(v) =>
              setUserTableFilters({ keyword: v })
            }
          />
        </Box>
        {isVendorCreateEnabled && (
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.CONTAINED}
            prefix={<BsPlusLg />}
            buttonType={ButtonType.NORMAL}
            onClick={onAddClick}
            sx={{ color: 'common.black' }}
          >
            Add Vendor
          </Button>
        )}
      </CenterRowSpaceBetween>
    </Stack>
  );
}
