import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import Input from 'shared/theme/components/Input';

function QuizOptions({
  options,
  handleOptionChange,
}: {
  options: string[];
  handleOptionChange: any;
}) {
  const theme = useTheme();
  return (
    <Stack gap={2}>
      <Typography
        sx={theme.typography.bodyTextMedium}
        color={theme.palette.gray.main}
      >
        Options
      </Typography>
      {options?.map((option, index) => {
        return (
          <Box key={index} pb={2}>
            {/* <FormInput
              sx={{ width: '100%' }}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e.target.value, index)}
            /> */}
            <Input
              // sx={{ width: '100%' }}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e.target.value, index)}
              id={option}
              name={option}
            />
          </Box>
        );
      })}
    </Stack>
  );
}

export default QuizOptions;
