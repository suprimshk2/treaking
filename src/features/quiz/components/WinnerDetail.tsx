import React from 'react';
import { Grid, Stack, Typography, Box, useTheme } from '@mui/material';
import Avatar from 'shared/theme/components/Avatar';
import { ListWithIcon } from 'shared/components/display/list-with-icon/ListWithIcon';
import { BsFillPhoneFill } from 'react-icons/bs';
import { IoLocation } from 'react-icons/io5';
import { IoIosMail } from 'react-icons/io';
import Chip from 'shared/theme/components/Chip';
import { spacing } from 'shared/theme/spacing';
import { IWinnerResponse } from '../interfaces';
import { formatFullName } from 'shared/utils/common';

function WinnerDetail({ profile }: { profile: IWinnerResponse }) {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.gray.lighter,
        paddingY: theme.spacing(3),
        paddingX: theme.spacing(3),
      }}
      m={0}
    >
      <Grid item px={theme.spacing(6)} xs={4}>
        <Avatar
          title={
            profile?.demographic?.firstName + profile?.demographic?.lastName
          }
          avatarstyle={{ height: 130, width: 130 }}
          src={profile.imageUrl}
        />
      </Grid>
      <Grid item xs={4}>
        <Stack gap={theme.spacing(2)} paddingLeft={theme.spacing(2)}>
          <Typography>
            {formatFullName(
              profile?.demographic?.firstName,
              profile?.demographic?.lastName,
              profile?.demographic?.middleName
            )}
          </Typography>
          <ListWithIcon
            list={[
              {
                id: 1,
                icon: BsFillPhoneFill,
                text: profile?.demographic?.mobileNumber,
                tooltip: true,
                truncateLength: 50,
              },
            ]}
          />
          <ListWithIcon
            list={[
              {
                id: 2,
                icon: IoIosMail,
                text: profile?.demographic?.email,
                tooltip: true,
                truncateLength: 50,
              },
            ]}
          />
          <ListWithIcon
            list={[
              {
                id: 3,
                icon: IoLocation,
                text: profile?.demographic?.address,
                tooltip: true,
                truncateLength: 50,
              },
            ]}
          />
        </Stack>
      </Grid>
      <Grid item justifyContent="flex-end" xs={4}>
        <Box
          alignContent="flex-end"
          display="flex"
          justifyContent="flex-end"
          color="red"
        >
          <Chip label={profile?.rankLabel} color={'success'} size="medium" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default WinnerDetail;
