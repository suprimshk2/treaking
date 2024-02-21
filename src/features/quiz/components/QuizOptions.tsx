import { Stack, Typography, useTheme, IconButton, Grid } from '@mui/material';
import { BsX } from 'react-icons/bs';
import FormInput from 'shared/components/form/FormInput';
import { useFormContext } from 'react-hook-form';
import { IQuizOptions } from '../interfaces';

function QuizOptions({ index }: { index: number }) {
  const {
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const theme = useTheme();
  const quizzes = watch('quizzes');
  const { options } = quizzes[index];

  const onDeleteOption = (optionIndex: number) => {
    const quizzesList = quizzes;
    quizzesList[index].options = quizzesList[index].options.filter(
      (item: IQuizOptions) => item.order !== optionIndex
    );
    setValue(`quizzes`, quizzes);
  };

  return (
    <Stack gap={2}>
      <Typography
        sx={theme.typography.bodyTextMedium}
        color={
          errors?.quizzes?.[index]?.options
            ? theme.palette.error.main
            : theme.palette.gray.dark
        }
      >
        Options *
      </Typography>
      {options?.map((option: IQuizOptions, optionIndex: number) => {
        const value: string | any = watch(
          `quizzes[${index}].options[${optionIndex}].name`
        );

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
                name={`quizzes[${index}].options[${optionIndex}].name`}
                id="options"
              />
            </Grid>
            <Grid item xs={1} mb={2}>
              {options.length > 1 && (
                <IconButton
                  onClick={() => onDeleteOption(option.order)}
                  sx={{
                    color: theme.palette.common.black,
                  }}
                >
                  <BsX />
                </IconButton>
              )}
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
