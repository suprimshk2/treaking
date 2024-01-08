import config from 'config';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { io } from 'socket.io-client';

const { accessToken } = useBoundStore.getState();

const socket = io(config.socketBaseURL, {
  extraHeaders: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export default socket;
