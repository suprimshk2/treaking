/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { toBase64 } from 'shared/utils/file';
import { useDropzone } from 'react-dropzone';
import { BsUpload } from 'react-icons/bs';
import { IFileSchema } from 'features/quiz/interfaces';
import { useFormContext } from 'react-hook-form';
import DropZoneFileList from './Dropdownlist';

export interface IFileDrop {
  path: string;
}

function FileDropzone({
  name = 'images',
  isFileSizeExceeds,
  onChange,
  maxSize,
}: {
  name?: string;
  isFileSizeExceeds?: boolean;
  onChange: (e: IFileSchema[]) => void;
  maxSize?: number;
}) {
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = errors[name];

  const [selectedFiles, setSelectedFiles] = useState<IFileSchema[]>([]);
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down('md'));

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (f) => {
      const newFiles: IFileSchema[] = [];
      for (let index = 0; index < f.length; index += 1) {
        let error = false;
        if (maxSize && f[index].size > maxSize) {
          error = true;
        }
        const uploadFile = {
          id: '!2',
          name: f[index].name,
          contentType: f[index].type,
          createdBy: '',
          // eslint-disable-next-line no-await-in-loop
          base64: await toBase64(f[index]),
          size: f[index].size,
          error,
        };
        newFiles.push(uploadFile);
      }

      setSelectedFiles((prev) => [...prev, ...newFiles]);
      // Since the state doesn't change in this section i.e [...prev, ...newFiles]
      onChange([...selectedFiles, ...newFiles]);
    },
  });

  const handleFileDelete = (id: string) => {
    const files = selectedFiles.filter((e: IFileSchema) => e.id !== id);
    setSelectedFiles(files);
    onChange(files);
  };
  const handleFileEdit = (file: IFileSchema) => {
    const files = selectedFiles.map((e: IFileSchema) => {
      if (e.id === file.id) return file;
      return e;
    });
    setSelectedFiles(files);
    onChange(files);
  };

  const files = selectedFiles.map((file: IFileSchema) => (
    <DropZoneFileList
      file={file}
      handleFileDelete={handleFileDelete}
      handleFileEdit={handleFileEdit}
      key={file.id}
    />
  ));

  return (
    <Box>
      <Box
        {...getRootProps({ className: 'fileDrop' })}
        color={hasError && theme.palette.error.main}
      >
        <input {...getInputProps()} />

        <Stack
          gap={2}
          alignItems="center"
          width="100%"
          height={85}
          border={2}
          borderRadius={2}
          borderColor="gray.light"
          textAlign="center"
          display="flex"
          justifyContent="center"
          flexDirection="row"
          mb="10"
          px={5}
          sx={{ borderStyle: 'dashed' }}
        >
          <BsUpload size={theme.spacing(5)} />

          {!isSmallerThanMd && (
            <Typography variant="bodyTextMedium">
              Drag and drop files here or click to browse
            </Typography>
          )}
          {isSmallerThanMd && <Typography>Click to browse</Typography>}
        </Stack>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        m="20"
        p="200"
        sx={{ paddingX: 5, paddingTop: 2 }}
      >
        <Typography gutterBottom={false} variant="caption">
          {/* * Please upload .pdf, .jpg,. jpeg, .doc, .docx, .txt only */}
        </Typography>
        <Typography
          gutterBottom={false}
          sx={{
            color: isFileSizeExceeds ? theme.palette.error.main : 'inherit',
          }}
          variant="caption"
        >
          Max size {maxSize && Math.floor(maxSize / (1000 * 1000))} MB
          {isFileSizeExceeds ? ' *' : ''}
        </Typography>
      </Box>
      <Box component="ul" sx={{ listStyle: 'none', marginTop: 2 }}>
        {files}
      </Box>
    </Box>
  );
}

FileDropzone.defaultProps = {
  isFileSizeExceeds: false,
  maxSize: undefined,
  name: 'images',
};
export default FileDropzone;
