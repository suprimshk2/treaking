import { Box, Grid, IconButton, Stack, useTheme } from '@mui/material';
import { TimeField } from '@mui/x-date-pickers';
import { useFieldArray } from 'react-hook-form';
import FormInput from 'shared/components/form/FormInput';
import { FormMaskedDateInput } from 'shared/components/form/FormMaskedDateInput';
import { SETTINGS_BAR_PROPERTY } from 'shared/constants/settings';
import { IoIosAddCircleOutline } from 'react-icons/io';
import FileDropzone from 'shared/components/file-upload/FileUpload';
import { useState } from 'react';
import { config } from 'shared/constants/config';
import { QuizMultiple } from './QuizMultiple';
import { IFileSchema } from '../interfaces';

// import { FormMaskedDateInput } from 'shared/components/form/FormMaskedDateInput';
// import { FormMaskedPhoneInput } from 'shared/components/form/FormMaskedPhoneInput';

// interface IProps {
//   isEditMode?: boolean;
// }

export function QuizAddFields({ control }: any) {
  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = useState<IFileSchema[]>([]);

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

  const onFileChange = (files: IFileSchema[]) => {
    if (files[0]?.error) {
      return;
    }
    const data = files.map((e: IFileSchema) => {
      const { error, ...rest } = e;
      return rest;
    });
    setSelectedFiles(data);
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

            <Grid container spacing={4} mb={2}>
              <Grid item xs={4}>
                <FormMaskedDateInput
                  name="dob"
                  id="dob"
                  label="Date of Birth "
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <TimeField name="startTime" id="startTime" label="Start Time" />
              </Grid>
              <Grid item xs={4} mb={2}>
                <TimeField name="startTime" id="startTime" label="Start Time" />
              </Grid>
            </Grid>

            <Grid item xs={6} mb={2}>
              <FormInput name="campaign" id="campaign" label="Campaign *" />
            </Grid>
            <Grid item xs={6} mb={2}>
              <FormInput
                name="prize"
                id="prize"
                label="Winning Prize Description "
              />
            </Grid>
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
                    fieldArrayIndex={index}
                    fieldArrayName="quizzes"
                    onDelete={() => remove(index)}
                  />
                </Box>
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
