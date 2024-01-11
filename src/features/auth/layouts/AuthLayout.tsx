import React from 'react';
import { Box, useTheme, Typography, Stack } from '@mui/material';

import Logo from 'shared/assets/svg/Logo.svg';
import LoginBackground from 'shared/assets/svg/Login_Background.svg';
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
    <Box
      width="100%"
      height="100%"
      sx={{
        backgroundImage: `url(${LoginBackground})`,
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        display="flex"
        alignSelf="center"
      >
        <Box
          sx={{ backgroundColor: 'transparent' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="100%"
          height="3%"
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
    </Box>
  );
}

AuthLayout.defaultProps = {
  title: '',
  titlePosition: 'center',
};

export default AuthLayout;
