import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import FormInput from 'shared/components/form/FormInput';
import { useFormContext } from 'react-hook-form';

function QuizOptions({
  fieldArrayIndex,
  fieldArrayName,
  options,
}: {
  fieldArrayIndex: number;
  fieldArrayName: string;
  options: string[];
}) {
  const {
    formState: { errors },
  } = useFormContext();
  const theme = useTheme();

  return (
    <Stack gap={2}>
      <Typography
        sx={theme.typography.bodyTextMedium}
        color={
          Object.keys(errors).length !== 0
            ? theme.palette.error.main
            : theme.palette.gray.dark
        }
      >
        Options
      </Typography>
      {options?.map((option, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} pb={2}>
            <FormInput
              name={
                `${fieldArrayName}.${fieldArrayIndex}.options.${index}` as const
              }
              // fieldError={
              //   errors?.quizzes?.[fieldArrayIndex]?.options as FieldError
              // }
              id="options"
            />
            {/* <Input
              // sx={{ width: '100%' }}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e.target.value, index)}
              id={option}
              name={option}
            /> */}
          </Box>
        );
      })}
    </Stack>
  );
}

export default QuizOptions;
