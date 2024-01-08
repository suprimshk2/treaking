import { Stack, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { BsGearFill, BsBellFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { ModuleCodes } from 'shared/enums';
import { useBoundStore } from 'shared/stores/useBoundStore';

export function SettingsMenu() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const authModules = useBoundStore.use.authModule();

  const settingObject = authModules?.modules?.find(
    (item: any) => item.code === ModuleCodes.SETTING
  );

  const notificationObject = authModules?.modules?.find(
    (item: any) => item.code === ModuleCodes.NOTIFICATION
  );

  const handleClick = (routePath: string) => {
    navigate(routePath);
  };
  return (
    <Stack direction="row" spacing={4}>
      {!!notificationObject && (
        <IconButton
          title="Notifications"
          className="filled-white"
          size={isMobileView ? 'small' : 'medium'}
          type="button"
          // onClick={() => handleClick(settingObject?.subModules[0].routePath)}
        >
          <BsBellFill size={20} />
        </IconButton>
      )}
      {!!settingObject && (
        <IconButton
          title="Settings"
          className="filled-white"
          size={isMobileView ? 'small' : 'medium'}
          type="button"
          onClick={() => handleClick(settingObject?.subModules[0].routePath)}
        >
          <BsGearFill size={20} />
        </IconButton>
      )}
    </Stack>
  );
}

export default SettingsMenu;
