import { Stack } from '@mui/material';
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

export function VendorTableBanner({ onAddClick }: IProps) {
  // const [value, setValue] = useState('');
  // const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  // const isRolesCreateEnabled = checkAuthForPermissions(
  //   ModuleCodes.SETTING,
  //   RolesMangementPermissions.CREATE,
  //   ResourceCode.ROLES_PERMISSION_MANAGEMENT
  // );

  return (
    <Stack spacing={4} mb={4} alignItems="flex-end">
      <CenterRowSpaceBetween>
        <Stack direction="row" spacing={4}>
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.CONTAINED}
            suffix={<BsPlusLg />}
            buttonType={ButtonType.NORMAL}
            onClick={onAddClick}
          >
            Add
          </Button>
        </Stack>
      </CenterRowSpaceBetween>
    </Stack>
  );
}
