/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Box, Card, CardHeader, Grid, useTheme } from '@mui/material';
import {
  mapUserAssignedResources,
  permissionChangeHandler,
} from 'shared/utils/common';

import { useSearchParams } from 'react-router-dom';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { cloneDeep } from 'lodash';
import { LoadingIndicator } from 'shared/components/display/LoadingIndicator';
import {
  useAssociatedPermissionsDetailQuery,
  useUserRoleDetailQuery,
} from '../queries';
import RolesModuleCardBody from './RolesModuleCardBody';
import { IPermission, IResource } from '../interfaces';

interface IProps {
  mainResources: IResource[];
  updatePermissions: (newPermissions: IResource[]) => void;
  setResourceBackup: (resources: IResource[]) => void;
}

export default function RolesCard({
  mainResources,
  updatePermissions,
  setResourceBackup,
}: IProps) {
  const theme = useTheme();

  const [searchParams] = useSearchParams();

  const allPermissions = useBoundStore.use.allPermissions();

  const onChangeHandler = (
    isChecked: boolean,
    resources: IResource[],
    resourceMeta: IResource,
    permissionMeta?: IPermission
  ) => {
    permissionChangeHandler({
      callBackFunction: updatePermissions,
      resources,
      resourceMeta,
      permissionMeta,
      isChecked,
    });
  };

  const roleId = searchParams.get('roleId');
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

  const getResourceDetailQuery = isManageUserPermission
    ? useGetUserResourceDetailQuery
    : useGetResourceDetailQuery;

  useEffect(
    () => {
      if (allPermissions) {
        const uiMappedResources = mapUserAssignedResources(
          allPermissions?.rows,
          getResourceDetailQuery?.data?.modules,
          getResourceDetailQuery?.data?.role?.code
        );
        setResourceBackup(cloneDeep(uiMappedResources));
        updatePermissions(uiMappedResources || []);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // allPermissions,
      // setResourceBackup,
      // updatePermissions,
      getResourceDetailQuery?.data?.modules,
    ]
  );

  const cardContentStyles = {
    padding: `${theme.spacing(2)}`,
    borderBottom: `1px solid ${theme.palette.gray.light}`,
    borderTop: `1px solid ${theme.palette.gray.light}`,
  };

  return (
    <Card
      sx={{
        boxShadow: 'none',
        border: `1px solid ${theme.palette.gray.light}`,
        borderRadius: 2,
      }}
    >
      <Box display="flex">
        <Box flex={1}>
          <CardHeader
            title="Permissions"
            titleTypographyProps={{
              variant: 'bodyTextLarge',
            }}
            sx={{
              ...cardContentStyles,
              px: 8,
            }}
          />
        </Box>
        <Box flex={1}>
          <CardHeader
            title="Description"
            titleTypographyProps={{
              variant: 'bodyTextLarge',
            }}
            sx={{
              ...cardContentStyles,
              px: 8,
            }}
          />
        </Box>
      </Box>

      {!mainResources?.length ? (
        <LoadingIndicator />
      ) : (
        <Grid container direction="column">
          {mainResources.map((resource: IResource) => (
            <Grid key={resource.name}>
              <RolesModuleCardBody
                resources={mainResources}
                resource={resource}
                onChangeHandler={onChangeHandler}
                cardContentStyles={cardContentStyles}
                depth={0}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Card>
  );
}
