import { Link as MuiLink } from '@mui/material';

import { Link as RouterLink, To } from 'react-router-dom';

interface IProps {
  to: To;
  children: React.ReactNode;
}

function Link({ children, to }: IProps) {
  return (
    <MuiLink
      component={RouterLink}
      to={to}
      variant="body1"
      color="common.white"
    >
      {children}
    </MuiLink>
  );
}

Link.defaultProps = {};

export default Link;
