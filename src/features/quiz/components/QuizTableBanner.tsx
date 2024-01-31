import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import { CenterRowSpaceBetween } from 'shared/components/layouts/CenterRowSpaceBetween';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsPlusLg } from 'react-icons/bs';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { checkAuthForPermissions } from 'shared/utils/common';
import { ModuleCodes, ResourceCode } from 'shared/enums';
import { RolesMangementPermissions } from 'features/settings/roles-and-permissions/enums';
import { useInfiniteRolesQuery } from 'features/settings/roles-and-permissions/queries';
import { SearchInput } from 'shared/theme/components/SearchInput';

interface IProps {
  onAddClick: VoidFunction;
}

export function QuizTableBanner({ onAddClick }: IProps) {
  const [value, setValue] = useState('');
  const setQuizTableFilters = useBoundStore.use.setQuizTableFilters();

  const isRolesCreateEnabled = checkAuthForPermissions(
    ModuleCodes.SETTING,
    RolesMangementPermissions.CREATE,
    ResourceCode.ROLES_PERMISSION_MANAGEMENT
  );

  const totalRoles = useBoundStore.use.totalRoles();
  const rolesTableFilter = useBoundStore.use.roleTableFilters();

  const { isFetching } = useInfiniteRolesQuery(rolesTableFilter);

  return (
    <Stack spacing={4} mb={4}>
      <CenterRowSpaceBetween>
        <Box display="flex" alignItems="center">
          <SearchInput
            placeholder="Search"
            value={value}
            onChangeHandler={(v) => setValue(v)}
            onDebouncedChangeHandler={(v) =>
              setQuizTableFilters({ keyword: v })
            }
          />
        </Box>
        <Button
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.CONTAINED}
          prefix={<BsPlusLg />}
          buttonType={ButtonType.NORMAL}
          onClick={onAddClick}
          sx={{ color: 'common.black' }}
        >
          Add Question
        </Button>
      </CenterRowSpaceBetween>
    </Stack>
  );
}
