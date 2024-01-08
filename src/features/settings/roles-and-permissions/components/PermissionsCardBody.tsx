import {
  Box,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from '@mui/material';
import { config } from 'shared/constants/config';
import { IPermission, IResource } from '../interfaces';

interface IProps {
  onChangeHandler: (
    isChecked: boolean,
    resources: IResource[],
    resource: IResource,
    permissionMeta: IPermission
  ) => void;
  cardContentStyles: any;
  permissions: IPermission[];
  resource: IResource;
  resources: IResource[];
  depth: number;
}

export default function PermissionCardBody({
  onChangeHandler,
  resource,
  resources,
  permissions = [],
  cardContentStyles,
  depth,
}: IProps) {
  const theme = useTheme();

  return (
    <div>
      <Box pt={2}>
        {permissions?.map((permission: IPermission) => (
          <CardContent
            key={permission.code}
            sx={{
              ...cardContentStyles,
              borderBottom: '0',
              borderTop: '0',
              ml: (depth + 1) * config.ROLE_PERMISSION_PADDING_SPACE,
            }}
          >
            <Box key={permission.code} display="flex">
              <Box flex={1} height="28px">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permission.isChecked}
                      disabled={permission.isDisabledForAdminRelatedRoles}
                      onChange={(event) =>
                        onChangeHandler(
                          event.target.checked,
                          resources,
                          resource,
                          permission
                        )
                      }
                    />
                  }
                  label={permission.label}
                />
              </Box>
              <Box flex={1} height="28px">
                <Typography
                  variant="bodyTextLarge"
                  color={theme.palette.text.secondary}
                >
                  {permission?.description}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        ))}
      </Box>
    </div>
  );
}
