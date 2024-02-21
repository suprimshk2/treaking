import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { SearchInput } from 'shared/theme/components/SearchInput';
import { CenterRowSpaceBetween } from 'shared/components/layouts/CenterRowSpaceBetween';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsPlusLg } from 'react-icons/bs';
import { checkAuthForPermissions } from 'shared/utils/common';
import { ResourceCode } from 'shared/enums';
import { offerManagementPermissions } from 'features/settings/roles-and-permissions/enums';

interface IProps {
  onAddClick: VoidFunction;
  children?: React.ReactNode;
}

export function OfferTableBanner({ onAddClick, children }: IProps) {
  const [value, setValue] = useState('');
  const setOfferTableFilters = useBoundStore.use.setOfferTableFilters();
  const isOfferCreateEnabled = checkAuthForPermissions(
    ResourceCode.OFFERS_MANAGEMENT,
    offerManagementPermissions.CREATE
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
              setOfferTableFilters({ keyword: v })
            }
          />
        </Box>

        <Stack direction="row" spacing={4}>
          {children}
          {isOfferCreateEnabled && (
            <Button
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.CONTAINED}
              prefix={<BsPlusLg />}
              buttonType={ButtonType.NORMAL}
              onClick={onAddClick}
              sx={{ flexShrink: 0, color: 'common.black' }}
            >
              Create Offer
            </Button>
          )}
        </Stack>
      </CenterRowSpaceBetween>

      {/* <Box>
        <TotalResult total={totalOffers} />
      </Box> */}
    </Stack>
  );
}

OfferTableBanner.defaultProps = {
  children: null,
};
