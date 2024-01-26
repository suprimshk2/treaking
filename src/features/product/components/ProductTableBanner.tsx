import { Stack } from '@mui/material';
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

interface IProps {
  onAddClick: VoidFunction;
}

export function ProductTableBanner({ onAddClick }: IProps) {
  // const [value, setValue] = useState('');
  // const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const isRolesCreateEnabled = checkAuthForPermissions(
    ModuleCodes.SETTING,
    RolesMangementPermissions.CREATE,
    ResourceCode.ROLES_PERMISSION_MANAGEMENT
  );

  const totalRoles = useBoundStore.use.totalRoles();
  const rolesTableFilter = useBoundStore.use.roleTableFilters();

  const { isFetching } = useInfiniteRolesQuery(rolesTableFilter);

  return (
    <Stack spacing={4} mb={4} alignItems="flex-end">
      <CenterRowSpaceBetween>
        {isRolesCreateEnabled && (
          //   <Stack direction="row" spacing={4}>
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.CONTAINED}
            suffix={<BsPlusLg />}
            buttonType={ButtonType.NORMAL}
            onClick={onAddClick}
          >
            Add
          </Button>
          //   </Stack>
        )}
      </CenterRowSpaceBetween>
    </Stack>
  );
}
