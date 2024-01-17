/* eslint-disable no-nested-ternary */
import {
  Box,
  CardContent,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { config } from 'shared/constants/config';

import PermissionCardBody from './PermissionsCardBody';
import { IPermission, IResource } from '../interfaces';

interface IProps {
  cardContentStyles: any;
  onChangeHandler: (
    isChecked: boolean,
    resources: IResource[],
    resourceMeta: IResource,
    permissionMeta?: IPermission
  ) => void;
  resources: IResource[];
  resource: IResource;
  depth: number;
}

export default function RolesModuleCardBody({
  cardContentStyles,
  onChangeHandler,
  resources,
  resource,
  depth = 0,
}: IProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const hasChildren =
    (resource?.subModules && resource?.subModules.length > 0) ||
    (resource?.permissions && resource?.permissions.length > 0);

  return (
    <div>
      <CardContent sx={cardContentStyles}>
        <Box display="flex">
          <Box flex={1} height="28px">
            <Box
              display="flex"
              gap={4}
              paddingLeft={
                (hasChildren ? depth : depth + 1) *
                config.ROLE_PERMISSION_PADDING_SPACE
              }
            >
              {hasChildren && !open && (
                <IconButton
                  size="small"
                  onClick={() => setOpen((prevState) => !prevState)}
                >
                  <BsChevronDown />
                </IconButton>
              )}
              {hasChildren && open && (
                <IconButton
                  size="small"
                  onClick={() => setOpen((prevState) => !prevState)}
                >
                  <BsChevronUp />
                </IconButton>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      resource.isIndeterminate ? false : resource.isChecked
                    }
                    disabled={resource.isDisabledForAdminRelatedRoles}
                    indeterminate={resource.isIndeterminate}
                    onChange={(event) =>
                      onChangeHandler(event.target.checked, resources, resource)
                    }
                  />
                }
                label={resource?.name}
              />
            </Box>
          </Box>
          <Box flex={1} pl={16} height="28px">
            <Typography
              variant="bodyTextLarge"
              color={theme.palette.text.secondary}
            >
              {resource?.name}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Collapse in={open}>
        <Grid container direction="column">
          {resource.subModules?.length ? (
            resource.subModules.map((subResource: IResource) => (
              <Grid key={subResource.name}>
                <RolesModuleCardBody
                  resources={resources}
                  resource={subResource}
                  onChangeHandler={onChangeHandler}
                  cardContentStyles={cardContentStyles}
                  depth={depth + 1}
                />
              </Grid>
            ))
          ) : resource.permissions?.length ? (
            <Grid key={resource.name}>
              <PermissionCardBody
                resources={resources}
                resource={resource}
                permissions={resource.permissions}
                onChangeHandler={onChangeHandler}
                cardContentStyles={cardContentStyles}
                depth={depth + 1}
              />
            </Grid>
          ) : (
            <div />
          )}
        </Grid>
      </Collapse>
    </div>
  );
}
