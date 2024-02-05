import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddQuizFormSchemaType, addQuizFormSchema } from '../schemas';
import {
  useAddQuizMutation,
  useEditQuizMutation,
  useQuizDetailQuery,
} from '../mutations';
import { QuizAddFields } from '../components/QuizAddFields';
import { formatQuizAddPayload, formatQuizEditPayload } from '../utils';
import { IAddQuizSchema } from '../interfaces';
import { FORMTYPE } from '../enums';

const defaultValues: IAddQuizSchema = {
  logoUrl: [],
  titleOne: '',
  titleTwo: '',
  subTitle: '',
  description: '',
  termsAndConditions: '',
  campaign: '',
  prizeDescription: '',
  winnerDate: new Date(),
  // winnerStartTime: '',
  // winnerEndTime: '',
  quizzes: [
    {
      question: '',
      startDate: new Date(),
      endDate: new Date(),
      options: [{ name: '', order: 0, id: '' }],
      correctOptionNumber: 0,
    },
  ],
};

export function QuizAddEdit() {
  const theme = useTheme();
  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.gray.lighter,
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const editQuizId = searchParams.get('id');
  const type = searchParams.get('type');

  const isEditMode = !!editQuizId && type === FORMTYPE.EDIT;

  const addQuizMutation = useAddQuizMutation();
  const editQuizMutation = useEditQuizMutation();
  const methods = useForm({
    resolver: zodResolver(addQuizFormSchema),
    defaultValues,
  });
  const { handleSubmit, reset, control } = methods;

  const quizDetailQuery = useQuizDetailQuery(editQuizId ?? '', {
    enabled: !!editQuizId,
  });
  // Prepopulate the form in case of edit
  useEffect(() => {
    if (quizDetailQuery?.data) {
      const quizData = quizDetailQuery?.data;

      reset({
        ...quizData,
        subTitle: quizData.title || '',
        titleOne: quizData.content.title || '',
        titleTwo: quizData.content.subTitle || '',
        description: quizData.content.description || '',
        winnerDate: new Date(quizData.winnerAnnouncementDate) || '',
        campaign: quizData.status || '',
        prizeDescription: quizData.prize.description || '',
        quizzes: [
          {
            correctOptionNumber: quizData.correctOptionNumber,
            options: quizData.options,
            question: quizData.description || '',
            startDate: new Date(quizData.startDate) || '',
            endDate: new Date(quizData.endDate) || '',
          },
        ],
      });
    }
  }, [quizDetailQuery?.data, reset]);

  const handleQuizAdd = (data: AddQuizFormSchemaType) => {
    const payload = formatQuizAddPayload(data);
    addQuizMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  const handleQuizEdit = (data: AddQuizFormSchemaType) => {
    const payload = formatQuizEditPayload(data);
    editQuizMutation.mutate(
      { id: editQuizId ?? '', data: payload },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  const onSubmit = (data: AddQuizFormSchemaType) => {
    if (isEditMode) {
      handleQuizEdit(data);
    } else {
      handleQuizAdd(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          alignContent="center"
          flexDirection="column"
          justifyContent="center"
          sx={{
            backgroundColor: theme.palette.gray.lighter,
            paddingBottom: theme.spacing(10),
          }}
        >
          <QuizAddFields
            control={control}
            isEditMode={isEditMode}
            optionsData={quizDetailQuery?.data?.options}
          />
          <Box
            maxWidth={518}
            display="flex"
            mx="auto"
            flexDirection="row"
            justifyContent="space-between"
            alignContent="center"
            sx={childrenContainerStyle}
          >
            <Button type="submit" variant="outlined">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
