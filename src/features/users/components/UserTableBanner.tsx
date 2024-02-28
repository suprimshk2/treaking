import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { SearchInput } from 'shared/theme/components/SearchInput';
import { TotalResult } from 'shared/components/display/TotalResult';
import { BreadCrumb } from 'shared/components/display/Breadcrumb';
import { CenterRowSpaceBetween } from 'shared/components/layouts/CenterRowSpaceBetween';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsPlusLg } from 'react-icons/bs';
import { checkAuthForPermissions } from 'shared/utils/common';
import { ModuleCodes, ResourceCode } from 'shared/enums';
// import { useInfiniteUsersQuery } from '../queries';
import { UserTableAdvancedFilterForm } from './UserTableAdvancedFilterForm';
import { UserMangementPermissions } from '../enums';

interface IProps {
  onAddClick: VoidFunction;
  children?: React.ReactNode;
}

export function UserTableBanner({ onAddClick, children }: IProps) {
  const [value, setValue] = useState('');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  // const userTableFilters = useBoundStore.use.userTableFilters();
  const setUserTableFilters = useBoundStore.use.setUserTableFilters();
  const totalUsers = useBoundStore.use.totalUsers();

  // const { isFetching } = useInfiniteUsersQuery(userTableFilters);

  const isUserCreateEnabled = checkAuthForPermissions(
    ResourceCode.USER_MANAGEMENT,
    UserMangementPermissions.CREATE
  );

  return (
    <Stack spacing={4} mb={4}>
      <BreadCrumb text="User Management" />
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
        {isUserCreateEnabled && (
          <Stack direction="row" spacing={4}>
            {children}
            <Button
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.CONTAINED}
              suffix={<BsPlusLg />}
              buttonType={ButtonType.NORMAL}
              onClick={onAddClick}
              sx={{ flexShrink: 0, color: 'black' }}
            >
              Add User
            </Button>
          </Stack>
        )}
      </CenterRowSpaceBetween>

      <Box>
        <UserTableAdvancedFilterForm
          show={isAdvancedFilterOpen}
          close={() => setIsAdvancedFilterOpen(false)}
        />
        <TotalResult total={totalUsers} />
      </Box>
    </Stack>
  );
}

UserTableBanner.defaultProps = {
  children: null,
};
