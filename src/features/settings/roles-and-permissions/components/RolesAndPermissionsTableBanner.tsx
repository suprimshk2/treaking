import { Stack, Box } from '@mui/material';
import { BreadCrumb } from 'shared/components/display/Breadcrumb';
import { CenterRowSpaceBetween } from 'shared/components/layouts/CenterRowSpaceBetween';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsPlusLg } from 'react-icons/bs';
import { TotalResult } from 'shared/components/display/TotalResult';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { checkAuthForPermissions } from 'shared/utils/common';
import { ModuleCodes, ResourceCode } from 'shared/enums';
import { useInfiniteRolesQuery } from '../queries';
import { RolesMangementPermissions } from '../enums';

interface IProps {
  onAddClick: VoidFunction;
}

export function RolesAndPermissionsTableBanner({ onAddClick }: IProps) {
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
    <Stack spacing={4} mb={4}>
      <CenterRowSpaceBetween>
        <Box display="flex" alignItems="center">
          <BreadCrumb text="Roles & Permissions" />
        </Box>
        {isRolesCreateEnabled && (
          <Stack direction="row" spacing={4}>
            <Button
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.CONTAINED}
              suffix={<BsPlusLg />}
              buttonType={ButtonType.NORMAL}
              onClick={onAddClick}
              sx={{ flexShrink: 0 }}
            >
              Add
            </Button>
          </Stack>
        )}
      </CenterRowSpaceBetween>
      <Box>
        <TotalResult total={isFetching ? '...' : totalRoles} />
      </Box>
    </Stack>
  );
}
