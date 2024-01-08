import { Box, Typography } from '@mui/material';

interface IProps {
  text?: string;
  height?: string;
  textAlign?: 'left' | 'right' | 'center';
}

export function NoDataAvailable({ text, height, textAlign }: IProps) {
  return (
    <Box alignItems="center" display="flex" height={height} width="100%">
      <Typography
        width="100%"
        display="block"
        ml={1}
        mt={1}
        color="gray.main"
        variant="bodyTextMedium"
        textAlign={textAlign}
      >
        {text}
      </Typography>
    </Box>
  );
}

NoDataAvailable.defaultProps = {
  text: 'No Result Found.',
  height: '65px',
  textAlign: 'center',
};
