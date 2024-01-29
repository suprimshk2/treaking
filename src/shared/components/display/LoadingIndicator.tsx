import { Box, CircularProgress, Typography } from '@mui/material';

interface IProps {
  containerHeight?: string;
  size?: string;
  label?: string | JSX.Element;
  align?: string;
  ml?: number;
}

export function LoadingIndicator({
  containerHeight,
  size,
  label,
  align = 'center',
  ml = 0,
}: IProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: containerHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: align,
        ml,
      }}
    >
      <CircularProgress size={size} />
      {label && (
        <Typography mt={3} textAlign="center" variant="body2">
          {label}
        </Typography>
      )}
    </Box>
  );
}

LoadingIndicator.defaultProps = {
  containerHeight: '20rem',
  size: '2rem',
  label: '',
  align: 'center',
  ml: 0,
};
