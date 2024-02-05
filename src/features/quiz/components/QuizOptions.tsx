import { Stack, Typography, useTheme, IconButton, Grid } from '@mui/material';
import { BsX } from 'react-icons/bs';
import React from 'react';
import FormInput from 'shared/components/form/FormInput';
import { useFormContext } from 'react-hook-form';
import { IQuizOptions } from '../interfaces';

function QuizOptions({
  fieldArrayIndex,
  fieldArrayName,
  setOptions,
}: {
  fieldArrayIndex: number;
  fieldArrayName: string;
  setOptions: any;
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const theme = useTheme();
  const options = watch('options');

  const onDeleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);

    setOptions(newOptions);
    setValue(`${fieldArrayName}.${fieldArrayIndex}.options`, newOptions, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  console.log('opts -> 🐸', options);

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
      {options?.map((option: IQuizOptions, index: number) => {
        return (
          <Grid
            container
            spacing={4}
            mb={2}
            pb={2}
            key={option?.order?.toString()}
          >
            <Grid item xs={11} mb={2}>
              <FormInput
                {...register(option.name)}
                value={watch(`options[${index}].name`)}
                name={`options[${index}].name`}
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
    </Stack>
  );
}

export default QuizOptions;
