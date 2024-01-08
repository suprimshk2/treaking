import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import uiRoute from 'shared/constants/uiRoute';
import { clearLocal, clearSession } from 'shared/utils/storage';
import { Button, ButtonSize, ButtonType } from 'shared/theme/components/Button';
import { useLogoutMutation } from '../mutations';

function Logout(): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutMutate } = useLogoutMutation();

  const [logoutError, setLoginError] = useState(false);

  useEffect(() => {
    logoutMutate('', {
      onSuccess: () => {
        queryClient.clear();
        clearLocal();
        clearSession();
        setTimeout(() => {
          // window.history.replaceState(null, '', uiRoute.auth.login);
          window.location.replace(uiRoute.auth.login);
        }, 800);
      },
      onError: () => {
        setLoginError(true);
      },
    });
  }, [navigate, queryClient, logoutMutate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ textAlign: 'center', mt: 10 }}
    >
      <Typography variant="bodyTextLargeMd">
        {logoutError ? 'Error Logging out.' : 'Logging out...'}
      </Typography>
      {logoutError && (
        <Button
          buttonType={ButtonType.NORMAL}
          size={ButtonSize.MEDIUM}
          sx={{ mt: 8 }}
          onClick={() => navigate(uiRoute.index)}
        >
          Go to Home{' '}
        </Button>
      )}
    </Box>
  );
}

export default Logout;
