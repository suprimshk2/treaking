import { Stack, Typography, useTheme, IconButton, Grid } from '@mui/material';
import { BsX } from 'react-icons/bs';
import React from 'react';
import FormInput from 'shared/components/form/FormInput';
import { useFormContext } from 'react-hook-form';

function QuizOptions({
  fieldArrayIndex,
  fieldArrayName,
  options,
  setOptions,
}: {
  fieldArrayIndex: number;
  fieldArrayName: string;
  options: string[];
  setOptions: any;
}) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const theme = useTheme();

  const onDeleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);

    setOptions(newOptions);
    setValue(`${fieldArrayName}.${fieldArrayIndex}.options`, newOptions, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Stack gap={2}>
      <Typography
        sx={theme.typography.bodyTextMedium}
        color={
          errors?.quizzes?.[fieldArrayIndex]?.options
            ? theme.palette.error.main
            : theme.palette.gray.dark
        }
      >
        Options
      </Typography>
      {options?.map((option, index) => {
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
                onClick={() => onDeleteOption(index)}
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
      {/* this willbe in use to show validation text */}
      {/* <Typography
        sx={theme.typography.bodyTextMedium}
        color={
          errors?.quizzes?.[fieldArrayIndex]?.options
            ? theme.palette.error.main
            : theme.palette.gray.dark
        }
      >
        at leasts 2
      </Typography> */}
    </Stack>
  );
}

export default QuizOptions;
