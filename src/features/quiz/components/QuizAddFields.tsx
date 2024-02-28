import { Box, Grid, IconButton, Stack, useTheme } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormInput from 'shared/components/form/FormInput';
import { IoIosAddCircleOutline } from 'react-icons/io';
import FileDropzone, {
  IFileRef,
} from 'shared/components/file-upload/FileUpload';
import { useRef } from 'react';
import { config } from 'shared/constants/config';
import { FormDatePicker } from 'shared/components/form/FormDatePicker';
import { FormTimePicker } from 'shared/components/form/FormTimePicker';
import { ICloudFile, IFilePayload } from 'features/product/interfaces';
import { CloudFileCategory, LookUpCode } from 'shared/enums';
import { useUploadImageMutation } from 'shared/mutation';
import { FormCampaignSelect } from 'shared/components/form/FormCampaignSelect';
import TextEditor from 'shared/components/text-editor';
import { QuizMultiple } from './QuizMultiple';

interface IProps {
  control: any;
  isEditMode: boolean;
}

export function QuizAddFields({ control, isEditMode }: IProps) {
  const theme = useTheme();
  const uploadImageMutation = useUploadImageMutation();
  const ref = useRef<IFileRef>(null);
  const prizeRef = useRef<IFileRef>(null);
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  console.log({ errors });

  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.gray.lighter,
    p: 4,
    borderRadius: 1,
    height: '100%',
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quizzes',
  });

  const onFileChange = (files: IFilePayload[]) => {
    files.forEach(async (item) => {
      const payload: ICloudFile = {
        file: item.file,
        category: CloudFileCategory.QUIZ_LOGO,
      };

      try {
        const data = await uploadImageMutation.mutateAsync(payload);

        const images = getValues('images');

        setValue('images', [
          ...(images ? images : []),
          { url: data?.data?.url ?? '' },
        ]);

        ref.current?.setFileState(item.fileId, data?.data?.url, false, true);
      } catch (error) {
        ref.current?.setFileState(item.fileId, '', false, false);
      }
    });
  };

  const onPrizeFileChange = (files: IFilePayload[]) => {
    files.forEach(async (item) => {
      const payload: ICloudFile = {
        file: item.file,
        category: CloudFileCategory.QUIZ_PRIZE,
      };

      try {
        const data = await uploadImageMutation.mutateAsync(payload);

        const images = getValues('prizeImage');

        setValue('prizeImage', [
          ...(images ? images : []),
          { url: data?.data?.url ?? '' },
        ]);

        prizeRef.current?.setFileState(
          item.fileId,
          data?.data?.url,
          false,
          true
        );
      } catch (error) {
        prizeRef.current?.setFileState(item.fileId, '', false, false);
      }
    });
  };

  const onAddGame = () => {
    const quizzes = getValues('quizzes');
    const data = [
      ...quizzes,
      {
        question: '',
        startDate: new Date(),
        endDate: new Date(),
        options: [{ name: '', order: 0, id: '' }],
        correctOptionNumber: -1,
      },
    ];

    setValue('quizzes', data);
  };

  return (
    <Box width="100%" height="100%">
      <Box sx={childrenContainerStyle}>
        <Stack
          p={4}
          spacing={4}
          maxWidth={600}
          mx="auto"
          sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Box>
            <Box paddingY={theme.spacing(3)}>
              <FileDropzone
                maxSize={config.MAX_FILE_SIZE}
                onChange={onFileChange}
                ref={ref}
                isMultiImage={false}
              />
            </Box>
            <Grid container spacing={4} mb={2}>
              <Grid item xs={4}>
                <FormInput
                  name="titleOne"
                  id="titleOne"
                  label="Title One *"
                  inputProps={{
                    maxLength: 15,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <FormInput
                  name="titleTwo"
                  id="titleTwo"
                  label="Title Two *"
                  inputProps={{
                    maxLength: 15,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <FormInput
                  name="subTitle"
                  id="subTitle"
                  label="Sub Title"
                  inputProps={{
                    maxLength: 30,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item mb={2}>
              <TextEditor
                name="description"
                height={200}
                label="Description *"
              />
            </Grid>

            <Grid item xs={6} mb={2}>
              <FormCampaignSelect
                name="campaign"
                id="campaign"
                label="Campaign *"
                clearable
              />
            </Grid>
            <Grid item xs={6} mb={2}>
              <TextEditor
                name="termsAndConditions"
                height={200}
                label="Terms & Condition"
                checkBoxEnabled
                param={LookUpCode.QUIZ_TERMS}
              />
            </Grid>
          </Box>
        </Stack>
        <Stack
          mt={4}
          p={4}
          spacing={4}
          maxWidth={600}
          mx="auto"
          sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Box>
            <Grid container spacing={4} mb={2}>
              <Grid item xs={6}>
                <FormDatePicker
                  minDate={new Date()}
                  name="winnerDate"
                  label="Winner Announcement Date"
                />
              </Grid>
              <Grid item xs={3} mb={2}>
                <FormTimePicker name="winnerDate" label="Start Time" />
              </Grid>
              <Grid item xs={3} mb={2}>
                <FormTimePicker name="winnerEndDate" label="End Time" />
              </Grid>
            </Grid>
            <Grid item mb={2}>
              <TextEditor
                name="prizeDescription"
                height={200}
                label="Winning Prize Description *"
              />
            </Grid>
            <Box paddingY={theme.spacing(3)}>
              <FileDropzone
                name="prizeImage"
                maxSize={config.MAX_FILE_SIZE}
                onChange={onPrizeFileChange}
                ref={prizeRef}
                isMultiImage={false}
              />
            </Box>
          </Box>
        </Stack>

        <Stack
          mt={4}
          // p={4}
          spacing={4}
          maxWidth={600}
          mx="auto"
          sx={{
            borderRadius: 2,
            // backgroundColor: theme.palette.common.white,
          }}
        >
          {fields.map((item, index) => {
            return (
              <Box
                key={item.id}
                display="flex"
                flexDirection="column"
                position="relative"
              >
                <Box key={item.id}>
                  <QuizMultiple
                    index={index}
                    fieldArrayIndex={index}
                    fieldArrayName="quizzes"
                    onDelete={() => remove(index)}
                  />
                </Box>
                {index !== fields.length - 1 || isEditMode ? null : (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    alignContent="center"
                    position="absolute"
                    sx={{
                      right: -50,
                      backgroundColor: theme.palette.common.white,
                      borderRadius: 1,
                    }}
                  >
                    <IconButton onClick={onAddGame}>
                      <IoIosAddCircleOutline color="green" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
