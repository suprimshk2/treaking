//

import * as React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import uiRoute from 'shared/constants/uiRoute';
import { Link, useLocation } from 'react-router-dom';

interface LinkTabProps {
  label: string;
  path: string;
}

function LinkTab({ path, ...rest }: LinkTabProps) {
  return <Tab component={Link} to={path} {...rest} />;
}

export default function ProfileTab() {
  const [activeTab, setActiveTab] = React.useState(0);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === uiRoute.profile.profile) {
      setActiveTab(0);
      return;
    }

    if (location.pathname === uiRoute.profile.profileSecurity) {
      setActiveTab(1);
      return;
    }

    throw Error('Tab value out of bounds');
  }, [location.pathname]);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={activeTab}>
        <LinkTab label="Profile" path={uiRoute.profile.profile} />
        <LinkTab
          label="Password & Security"
          path={uiRoute.profile.profileSecurity}
        />
      </Tabs>
    </Box>
  );
}
