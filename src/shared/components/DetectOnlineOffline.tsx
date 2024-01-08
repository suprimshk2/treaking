import { useEffect, useState } from 'react';

import { Backdrop } from '@mui/material';
import { useSnackbar } from 'notistack';

import { MESSAGE } from '../constants/message';

function DetectOnlineOffline(): JSX.Element {
  const [isOffline, setOffline] = useState<boolean>(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const handleOnline = () => {
      closeSnackbar();
      setOffline(false);
    };
    const handleOffline = () => {
      enqueueSnackbar(MESSAGE.OFFLINE, {
        variant: 'error',
        persist: true,
      });
      setOffline(true);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [closeSnackbar, enqueueSnackbar]);

  return (
    <Backdrop
      open={isOffline}
      sx={{
        color: (theme) => theme.palette.common.white,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    />
  );
}
export default DetectOnlineOffline;
