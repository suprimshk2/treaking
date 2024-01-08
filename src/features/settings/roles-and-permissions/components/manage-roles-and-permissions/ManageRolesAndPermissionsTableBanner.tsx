import { Stack, Box } from '@mui/material';
import { CenterRowSpaceBetween } from 'shared/components/layouts/CenterRowSpaceBetween';
import { BreadCrumb } from 'shared/components/display/Breadcrumb';
import { useSearchParams } from 'react-router-dom';
import {
  useAssociatedPermissionsDetailQuery,
  useUserRoleDetailQuery,
} from '../../queries';

export default function ManageRolesAndPermissionsTableBanner() {
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get('roleId');
  // TODO: Need to implement this int eh future/.,
  const userId = searchParams.get('userId');

  const isManageUserPermission = !!userId;

  const useGetResourceDetailQuery = useAssociatedPermissionsDetailQuery(
    roleId!,
    {
      enabled: !!roleId,
    }
  );

  const useGetUserResourceDetailQuery = useUserRoleDetailQuery(userId!, {
    enabled: !!userId,
  });

  const resourceDetailQuery = isManageUserPermission
    ? useGetUserResourceDetailQuery
    : useGetResourceDetailQuery;

  const roleName = resourceDetailQuery?.data?.role?.name;

  const { isFetching } = resourceDetailQuery;

  return (
    <Stack spacing={4} mb={4}>
      <CenterRowSpaceBetween>
        <Box display="flex" alignItems="center">
          {}{' '}
          <BreadCrumb
            text={
              isFetching
                ? '...'
                : `Manage Roles & Permission ${
                    roleName ? `for - ${roleName}` : ''
                  } `
            }
          />
        </Box>
      </CenterRowSpaceBetween>
    </Stack>
  );
}
