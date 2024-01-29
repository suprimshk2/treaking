/* eslint-disable react/display-name */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { BsUpload } from 'react-icons/bs';
import { IFileSchema } from 'features/quiz/interfaces';
import { useFormContext } from 'react-hook-form';
import DropZoneFileList from './Dropdownlist';

export interface IFileDrop {
  path: string;
}

const FileDropzone = forwardRef(
  (
    {
      name = 'images',
      isFileSizeExceeds,
      onChange,
      maxSize,
    }: {
      name?: string;
      isFileSizeExceeds?: boolean;
      onChange: (e: IFileSchema[]) => void;
      maxSize?: number;
    },
    ref
  ) => {
    const {
      formState: { errors },
    } = useFormContext();
    const hasError = errors[name];

    const [selectedFiles, setSelectedFiles] = useState<IFileSchema[]>([]);
    const theme = useTheme();
    const isSmallerThanMd = useMediaQuery(theme.breakpoints.down('md'));

    const { getRootProps, getInputProps } = useDropzone({
      onDrop: async (droppedFiles: File[]) => {
        const newFiles: IFileSchema[] = [];

        for (const file of droppedFiles) {
          let error = false;
          if (maxSize && file.size > maxSize) {
            error = true;
          }
          newFiles.push(droppedFiles[0]);
        }

        setSelectedFiles((prev) => [...prev, ...newFiles]);
        onChange([...selectedFiles, ...newFiles]);
      },
    });

    const handleFileDelete = () => {
      const files = selectedFiles;
      setSelectedFiles(files);
      onChange(files);
    };

    const files = selectedFiles.map((file: IFileSchema) => (
      <DropZoneFileList
        isLoading={file.isLoading}
        file={file}
        handleFileDelete={handleFileDelete}
        key={file.id}
      />
    ));

    useImperativeHandle(ref, () => ({
      setFileState: (id: string, isLoading: boolean) => {
        const file = selectedFiles.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isLoading,
            };
          }
          return item;
        });
        setSelectedFiles(file);
      },
    }));

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
);

FileDropzone.defaultProps = {
  isFileSizeExceeds: false,
  maxSize: undefined,
  name: 'images',
};

export default FileDropzone;
