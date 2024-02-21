/* eslint-disable react/display-name */
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useId,
  useEffect,
} from 'react';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { BsUpload } from 'react-icons/bs';
import { useFormContext } from 'react-hook-form';
import { IFilePayload } from 'features/product/interfaces';
import DropZoneFileList from './Dropdownlist';

export interface IFileDrop {
  path: string;
}

export interface IFileRef {
  setFileState: (
    id: string,
    url: string,
    isLoading: boolean,
    success: boolean
  ) => void;
}

const FileDropzone = forwardRef(
  (
    {
      name = 'images',
      isFileSizeExceeds,
      onChange,
      maxSize,
      isMultiImage,
    }: {
      name?: string;
      isFileSizeExceeds?: boolean;
      onChange: (e: IFilePayload[]) => void;
      maxSize?: number;
      isMultiImage?: boolean;
    },
    ref
  ) => {
    const {
      clearErrors,
      getValues,
      setValue,
      formState: { errors },
    } = useFormContext();
    const images = getValues(name);

    const hasError = errors[name];

    const fileId = useId();

    const [selectedFiles, setSelectedFiles] = useState<IFilePayload[]>([]);
    const theme = useTheme();
    const isSmallerThanMd = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
      if (images?.length) {
        const mapIdToImage = images.map((item: IFilePayload, index: number) => {
          return { ...item, fileId: `${fileId}-${index}`, isSuccess: true };
        });

        setSelectedFiles(mapIdToImage);
      }
    }, [fileId, images, setValue]);

    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        'image/png': ['.png'],
        'image/svg': ['.svg'],
        'image/jpg': ['.jpg', '.jpeg'],
      },
      onDrop: async (droppedFiles: File[]) => {
        clearErrors(name);
        const newFiles: IFilePayload[] = [];
        droppedFiles.forEach((file) => {
          if (maxSize && file.size > maxSize) {
            return;
          }

          newFiles.push({
            file,
            fileId: `${fileId}-${newFiles.length}`,
            isLoading: true,
          });
        });

        setSelectedFiles((prev) => [...prev, ...newFiles]);
        onChange(newFiles);
      },
    });

    const handleFileDelete = (id: string) => {
      const files = selectedFiles.filter((item) => item.fileId !== id);
      setSelectedFiles(files);
      setValue(name, files);
    };

    const files = selectedFiles.map((file: IFilePayload) => (
      <DropZoneFileList
        isSuccess={file.isSuccess}
        isLoading={file.isLoading}
        url={file.url}
        file={file}
        handleFileDelete={handleFileDelete}
        key={file.fileId}
      />
    ));

    useImperativeHandle(ref, () => ({
      setFileState: (
        id: string,
        url: string,
        isLoading: boolean,
        isSuccess: boolean
      ) => {
        const file = selectedFiles.map((item) => {
          if (item.fileId === id) {
            return {
              ...item,
              isLoading,
              isSuccess,
              url,
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
          <input {...getInputProps()} multiple={false} />

          {selectedFiles?.length < 1 && !isMultiImage && (
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
          )}
          {isMultiImage && (
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
          )}
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
          {selectedFiles?.length < 1 && !isMultiImage && (
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
          )}
          {isMultiImage && (
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
          )}
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
  isMultiImage: true,
};

export default FileDropzone;
