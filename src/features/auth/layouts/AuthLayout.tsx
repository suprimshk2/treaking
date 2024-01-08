import React from 'react';
import { Box, useTheme, Typography, Stack } from '@mui/material';

import Logo from 'shared/assets/svg/Logo.svg';
import loginImage from 'shared/assets/jpg/login-bg-holista.jpg';
import whiteLogo from 'shared/assets/png/holista-logo-white.png';
import { LAYOUT_MAX_WIDTH } from '../constants/misc';
import CopyrightFooter from '../components/CopyrightFooter';

interface IProps {
  title?: string;
  titlePosition?: 'left' | 'right' | 'center';
  children: React.ReactNode;
}

function AuthLayout({ title, titlePosition, children }: IProps) {
  const theme = useTheme();

  const copyrightFooterStyle = {
    marginX: 'auto',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 8,
    marginTop: 'auto',
  };

  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.customShadows.dropShadow2,
    borderRadius: 1,
    padding: 8,
  };

  return (
    <Stack direction="row">
      <Box width="50%" position="relative">
        <Box
          component="img"
          src={loginImage}
          display="block"
          width="100%"
          height="100%"
          sx={{
            objectFit: 'cover',
          }}
        />
        <Box
          component="img"
          src={whiteLogo}
          marginX="auto"
          sx={{
            top: '1rem',
            left: '1rem',
          }}
          position="absolute"
          height="5rem"
          width="13.75rem"
        />
      </Box>
      <Box
        sx={{ backgroundColor: theme.palette.primary.lighter }}
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        width="50%"
      >
        <Stack
          width="100%"
          maxWidth={LAYOUT_MAX_WIDTH}
          marginX="auto"
          paddingTop={{ xs: 20, xl: 30 }}
          spacing={16}
        >
          <Box
            component="img"
            src={Logo}
            display="block"
            marginX="auto"
            height="60px"
            // marginBottom={{ xs: 12, xl: 16 }}
          />
          <Box sx={childrenContainerStyle}>
            {title && (
              <Typography
                variant="h6"
                color="initial"
                // marginBottom={8} // TODO: Consult with Design Team for the spacing
                textAlign={titlePosition}
              >
                {title}
              </Typography>
            )}

            {children}
          </Box>

          <CopyrightFooter containerSx={copyrightFooterStyle} />
        </Stack>

        {/* <Box minHeight={160} /> */}
      </Box>
    </Stack>
  );
}

AuthLayout.defaultProps = {
  title: '',
  titlePosition: 'center',
};

export default AuthLayout;
