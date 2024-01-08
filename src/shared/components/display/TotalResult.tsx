import { Box, Typography } from '@mui/material';

interface IProps {
  total: number | string;
}

export function TotalResult({ total }: IProps) {
  return (
    <Box>
      <Typography variant="bodyTextLarge">
        Total Results:{' '}
        <Typography component="span" variant="bodyTextLargeMd">
          {total}
        </Typography>
      </Typography>
    </Box>
  );
}
