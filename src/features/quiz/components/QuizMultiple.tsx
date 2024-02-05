import { Box, Grid, useTheme } from '@mui/material';
import { FieldError, useFormContext } from 'react-hook-form';
import FormInput from 'shared/components/form/FormInput';
import { FormTimePicker } from 'shared/components/form/FormTimePicker';
import { FormDatePicker } from 'shared/components/form/FormDatePicker';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { useSearchParams } from 'react-router-dom';
import { AddQuizFormSchemaType } from '../schemas';
import QuizOptions from './QuizOptions';
import { Option } from '../interfaces';
import { FORMTYPE } from '../enums';
import { QuizOptionSelect } from './OptionSelect';

export function QuizMultiple({
  index,
  fieldArrayIndex,
  fieldArrayName,
  onDelete,
  isEditMode,
  optionsData,
}: {
  index: number;
  fieldArrayIndex: number;
  fieldArrayName: string;
  onDelete: () => void;
  isEditMode: boolean;
  optionsData: Option[];
}) {
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  const duplicateId = searchParams.get('id');
  const type = searchParams.get('type');
  const isDuplicate = !!duplicateId && type === FORMTYPE.DUPLICATE;

  const {
    formState: { errors },
  } = useFormContext<AddQuizFormSchemaType>();
  const { setValue, getValues, watch } = useFormContext();

  const { options } = watch('quizzes')[index];

  // Use this on edit quiz
  // useEffect(() => {
  //   if ((isEditMode && optionsData) || (isDuplicate && optionsData)) {
  //     const optionNames = optionsData?.map((item) => item?.name || '');
  //   }
  // }, [isDuplicate, isEditMode, optionsData]);

  const handleAddOption = () => {
    const quizzes = getValues('quizzes');
    const optionsList = quizzes[index].options;
    const lastOption = [...optionsList].pop()?.order ?? 0;

    quizzes[index].options = [
      ...quizzes[index].options,
      { name: '', order: lastOption + 1 },
    ];
    setValue('quizzes', quizzes);
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
          <FormDatePicker
            minDate={new Date()}
            name={`${fieldArrayName}.${fieldArrayIndex}.startDate`}
            label="Start Date"
          />
        </Grid>
        <Grid item xs={6} mb={2}>
          <FormTimePicker
            name={`${fieldArrayName}.${fieldArrayIndex}.startDate`}
            label="Start Time"
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={2}>
        <Grid item xs={6}>
          <FormDatePicker
            minDate={new Date()}
            name={`${fieldArrayName}.${fieldArrayIndex}.endDate`}
            label="End Date"
          />
        </Grid>
        <Grid item xs={6} mb={2}>
          <FormTimePicker
            name={`${fieldArrayName}.${fieldArrayIndex}.endDate`}
            label="End Time"
          />
        </Grid>
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
      <Grid item xs={6} mb={2}>
        <Box>
          <QuizOptions index={index} />
          <Button
            size={ButtonSize.SMALL}
            onClick={handleAddOption}
            variant={ButtonVariant.OUTLINED}
            sx={{
              marginTop: 2,
              backgroundColor: theme.palette.gray.lighter,
              borderColor: theme.palette.gray.light,
              alignItems: 'center',
              justifyContent: 'flex-start',
              color: theme.palette.gray.dark,
              height: 40,
              borderRadius: 1,
              width: '92%',
            }}
          >
            Add Option
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6} mb={2}>
        <QuizOptionSelect
          name={
            `${fieldArrayName}.${fieldArrayIndex}.correctOptionNumber` as const
          }
          id="correctOptionNumber"
          label="Correct Option"
          clearable
          optionList={options}
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
        {fieldArrayIndex === 0 ? null : (
          <Button
            size={ButtonSize.SMALL}
            onClick={onDelete}
            variant={ButtonVariant.TEXT}
            sx={{ color: theme.palette.error.main }}
          >
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
}
