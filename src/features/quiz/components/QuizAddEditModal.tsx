import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { AddQuizFormSchemaType, addQuizFormSchema } from '../schemas';
import { useAddQuizMutation, useQuizDetailQuery } from '../mutations';
import { QuizAdd } from './QuizAddFields';

const defaultValues: any = {
  titleOne: '',
  titleTwo: '',
  terms: '',
  body: '',
  endDate: '',
  campaign: '',
  prize: '',
  startDate: '',
  winnerDate: '',

  quizzes: [
    {
      question: '',
    },
  ],
};

// const handleUserEdit = (data: AddQuizFormSchemaType) => {
//   const payload = {};

//   editUserMutation.mutate(
//     { id: editUserId, data: payload },
//     {
//       onSuccess: () => {
//         onCloseModal();
//       },
//     }
//   );
// };

export function QuizAddEditModal() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const editQuizId = searchParams.get('id');
  // console.log(editQuizId);

  const addQuizMutation = useAddQuizMutation();
  const methods = useForm<AddQuizFormSchemaType>({
    resolver: zodResolver(addQuizFormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const theme = useTheme();
  const quizDetailQuery = useQuizDetailQuery(editQuizId ?? '', {
    enabled: !!editQuizId,
  });
  // Prepopulate the form in case of edit
  useEffect(() => {
    if (quizDetailQuery?.data) {
      // const { demographic } = quizDetailQuery.data;
      reset({
        titleOne: '',
        titleTwo: '',
        body: '',
        winnerDate: '',
        startDate: '',
        endDate: '',
        campaign: '',
        prize: '',
        terms: '',
      });
    }
  }, [quizDetailQuery?.data, reset]);

  const handleQuizAdd = (data: AddQuizFormSchemaType) => {
    addQuizMutation.mutate(
      { data },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };
  const isEditMode = !!editQuizId;

  const onSubmit = (data: AddQuizFormSchemaType) => {
    console.log('data-----', data);

    // if (isEditMode) {
    //   // handleUserEdit(data);
    // } else {
    //   handleQuizAdd(data);
    // }
  };
  const childrenContainerStyle = {
    width: '100%',

    backgroundColor: theme.palette.error.lighter,
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          alignContent="center"
          flexDirection="column"
          justifyContent="center"
        >
          <QuizAdd control={control} />
          {/* <Box
            maxWidth={518}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignContent="center"
            sx={childrenContainerStyle}
          >
            <Button type="submit" variant="outlined">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Box> */}
        </Box>
      </form>
    </FormProvider>
  );
}
