import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Outlet } from 'react-router-dom';

import ProfileTab from 'shared/theme/components/Tab';
import layoutConstants from 'shared/constants/layout';
import { useBoundStore } from 'shared/stores/useBoundStore';
import UserProfileDetails from '../components/UserProfileDetails';

export function UserProfile() {
  const theme = useTheme();
  const authData = useBoundStore.use.authData();
  return (
    <Box pb={2}>
      <Box bgcolor={theme.palette.primary.lighter} px={2}>
        <Stack
          gap={2}
          // mx={32}
          sx={{
            pt: 4,
            mx: { xs: 'auto' },
            maxWidth: theme.spacing(layoutConstants.MANAGE_PROFILE_WIDTH),
          }}
        >
          <Typography variant="h6" fontWeight="medium">
            Profile
          </Typography>
          <Paper
            sx={{
              pt: 8,
              px: 4,
              boxShadow: 'none',
              borderRadius: 0,
            }}
          >
            <UserProfileDetails
              username={`${authData?.fullName || ''}` || ''}
              className="size-large"
              email={authData?.email}
            />

            <Stack flexDirection="row" mt={4} gap={8}>
              <ProfileTab />
            </Stack>
          </Paper>
        </Stack>
      </Box>
      <Divider />
      <Paper
        sx={{
          mx: { xs: 'auto' },
          p: 4,
          maxWidth: theme.spacing(layoutConstants.MANAGE_PROFILE_WIDTH),
          boxShadow: theme.customShadows.dropShadow2,
        }}
        // mt={8}
      >
        <Outlet />
      </Paper>
    </Box>
  );
}
