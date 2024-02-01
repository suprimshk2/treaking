import {
  Box,
  Stack,
  Typography,
  useTheme,
  IconButton,
  Grid,
} from '@mui/material';
import { BsX } from 'react-icons/bs';
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
  console.log({ options });
  console.log('op', errors);

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
        console.log({ option });

        return (
          <Grid container spacing={4} mb={2} pb={2} key={index}>
            <Grid item xs={11} mb={2}>
              <FormInput
                // value={option}
                name={
                  `${fieldArrayName}.${fieldArrayIndex}.options.${index}` as const
                }
                fieldError={
                  errors?.quizzes?.[fieldArrayIndex]?.options as FieldError
                }
                id="options"
              />
            </Grid>
            <Grid item xs={1} mb={2}>
              <IconButton
                onClick={() => {
                  options.splice(index, 1);
                }}
                sx={{
                  color: theme.palette.common.black,
                }}
              >
                <BsX />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </Stack>
  );
}

export default QuizOptions;
