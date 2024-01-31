import { Box, Grid, IconButton, Stack, useTheme } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormInput from 'shared/components/form/FormInput';
import { SETTINGS_BAR_PROPERTY } from 'shared/constants/settings';
import { IoIosAddCircleOutline } from 'react-icons/io';
import FileDropzone, {
  IFileRef,
} from 'shared/components/file-upload/FileUpload';
import { useState, useRef } from 'react';
import { config } from 'shared/constants/config';
import { FormDatePicker } from 'shared/components/form/FormDatePicker';
import { FormTimePicker } from 'shared/components/form/FormTimePicker';
import { ICloudFile, IFilePayload } from 'features/product/interfaces';
import { CloudFileCategory } from 'shared/enums';
import { useUploadImageMutation } from 'shared/mutation';
import { IFileSchema } from '../interfaces';
import { QuizMultiple } from './QuizMultiple';

// import { FormMaskedDateInput } from 'shared/components/form/FormMaskedDateInput';
// import { FormMaskedPhoneInput } from 'shared/components/form/FormMaskedPhoneInput';

// interface IProps {
//   isEditMode?: boolean;
// }

export function QuizAddFields({ control, isEditMode, optionsData }: any) {
  const theme = useTheme();
  const uploadImageMutation = useUploadImageMutation();
  const ref = useRef<IFileRef>(null);
  const [selectedFiles, setSelectedFiles] = useState<IFileSchema[]>([]);
  const [prizeFiles, setPrizeFiles] = useState<IFileSchema[]>([]);
  const { getValues, setValue } = useFormContext();
  const { HEADER_HEIGHT } = SETTINGS_BAR_PROPERTY;
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
    files.forEach(async (item, index) => {
      const payload: ICloudFile = {
        file: item.file,
        category: CloudFileCategory.QUIZ_LOGO,
      };

      try {
        const data = await uploadImageMutation.mutateAsync(payload);
        const images = getValues('logoUrl');
        setValue('logoUrl', [
          ...images,
          { url: data?.data?.url ?? '', order: index },
        ]);

        ref.current?.setFileState(item.fileId, false, true);
      } catch (error) {
        ref.current?.setFileState(item.fileId, false, false);
      }
    });
  };
  const onPrizeFileChange = (files: IFileSchema[]) => {
    if (files[0]?.error) {
      return;
    }
    const data = files.map((e: IFileSchema) => {
      const { error, ...rest } = e;
      return rest;
    });
    setPrizeFiles(data);
  };
  return (
    <Box
      width="100%"
      height="100%"
      // sx={{
      //   backgroundColor: 'red',
      // }}
    >
      <Box sx={childrenContainerStyle}>
        <Stack
          p={4}
          spacing={4}
          maxWidth={518}
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
              />
            </Box>
            <Grid container spacing={4} mb={2}>
              <Grid item xs={4}>
                <FormInput name="titleOne" id="titleOne" label="Title One *" />
              </Grid>
              <Grid item xs={4}>
                <FormInput name="titleTwo" id="titleTwo" label="Title Two" />
              </Grid>
              <Grid item xs={4}>
                <FormInput name="subTitle" id="subTitle" label="Sub Title *" />
              </Grid>
            </Grid>
            <Grid item spacing={4} mb={2}>
              <FormInput
                name="description"
                id="description"
                label="Description"
                multiline
              />
            </Grid>

            <Grid item xs={6} mb={2}>
              <FormInput name="campaign" id="campaign" label="Campaign" />
            </Grid>
            <Grid item xs={6} mb={2}>
              <FormInput
                name="termsAndConditions"
                id="termsAndConditions"
                label="Terms & Condition "
                multiline
              />
            </Grid>
          </Box>
        </Stack>
        <Stack
          mt={4}
          p={4}
          spacing={4}
          maxWidth={518}
          mx="auto"
          sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Box>
            <Grid container spacing={4} mb={2}>
              <Grid item xs={5}>
                <FormDatePicker
                  minDate={new Date()}
                  name="winnerDate"
                  label="Winner Announcement Date"
                />
              </Grid>
              <Grid item xs={3.5} mb={2}>
                <FormTimePicker name="winnerDate" label="Start Time" />
              </Grid>
              <Grid item xs={3.5} mb={2}>
                <FormTimePicker name="winnerEndTime" label="End Time" />
              </Grid>
            </Grid>
            <Grid item spacing={4} mb={2}>
              <FormInput
                name="prizeDescription"
                id="prizeDescription"
                label="Winning Prize Description"
                multiline
              />
            </Grid>
            <Box paddingY={theme.spacing(3)}>
              <FileDropzone
                maxSize={config.MAX_FILE_SIZE}
                onChange={onPrizeFileChange}
              />
            </Box>
          </Box>
        </Stack>

        <Stack
          mt={4}
          // p={4}
          spacing={4}
          maxWidth={518}
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
                    isEditMode={isEditMode}
                    fieldArrayIndex={index}
                    fieldArrayName="quizzes"
                    onDelete={() => remove(index)}
                    optionsData={optionsData}
                  />
                </Box>
                {isEditMode ? null : (
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
                    <IconButton onClick={() => append([{ name: 'quizzes' }])}>
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

QuizAddFields.defaultProps = {
  isEditMode: false,
};
