import { Box, Button, Grid, useTheme } from '@mui/material';
import { TimeField } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import FormInput from 'shared/components/form/FormInput';
import { FormMaskedDateInput } from 'shared/components/form/FormMaskedDateInput';

import { AddQuizFormSchemaType } from '../schemas';
import QuizOptions from './QuizOptions';

export function QuizMultiple({
  fieldArrayIndex,
  fieldArrayName,
  onDelete,
}: {
  fieldArrayIndex: number;
  fieldArrayName: string;
  onDelete: () => void;
}) {
  const theme = useTheme();

  const {
    formState: { errors },
  } = useFormContext<AddQuizFormSchemaType>();
  const [options, setOptions] = useState(['']);

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      maxWidth={518}
      mx="auto"
      p={5}
      sx={{
        borderRadius: 2,
        backgroundColor: theme.palette.common.white,
      }}
    >
      <Grid container spacing={4} mb={2}>
        <Grid item xs={6}>
          <FormMaskedDateInput
            name="startDate"
            id="startDate"
            label="Start Date "
          />
        </Grid>
        <Grid item xs={6} mb={2}>
          <TimeField
            name="startTime"
            id="startTime"
            label="Start Time"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={2}>
        <Grid item xs={6}>
          <FormMaskedDateInput name="endDate" id="endDate" label="End Date " />
        </Grid>
        <Grid item xs={6} mb={2}>
          <TimeField name="endTime" id="endTime" label="End Time" fullWidth />
        </Grid>
      </Grid>
      <Grid item xs={6} mb={2}>
        <div>
          <QuizOptions
            options={options}
            handleOptionChange={handleOptionChange}
          />
          <Button onClick={handleAddOption}>Add Option</Button>
        </div>
        {/* <FormInput
          name={`${fieldArrayName}.${fieldArrayIndex}.question` as const}
          fieldError={
            errors?.quizzes?.[fieldArrayIndex]?.question as FieldError
          }
          id="question"
          label="Question *"
        /> */}
      </Grid>
      <Grid item xs={6} mb={2}>
        <FormInput
          name={`${fieldArrayName}.${fieldArrayIndex}.question` as const}
          fieldError={
            errors?.quizzes?.[fieldArrayIndex]?.question as FieldError
          }
          id="question"
          label="Question *"
        />
      </Grid>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignContent="center"
        sx={{
          right: 0,
        }}
      >
        <Button onClick={onDelete}>Delete</Button>
      </Box>
    </Box>
  );
}
