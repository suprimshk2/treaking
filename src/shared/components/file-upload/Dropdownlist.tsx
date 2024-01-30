import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { BsCheckCircle, BsTrash, BsXCircle } from 'react-icons/bs';
import { IFilePayload } from 'features/product/interfaces';
import { LoadingIndicator } from '../display/LoadingIndicator';

function DropZoneFileList({
  isSuccess = false,
  isLoading = true,
  file,
  handleFileDelete,
}: {
  isSuccess?: boolean;
  isLoading?: boolean;
  file: IFilePayload;
  handleFileDelete: (id: string) => void;
}) {
  const theme = useTheme();

  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      key={file.fileId}
      marginBottom={1}
    >
      <Box
        sx={{
          textAlign: 'left',
        }}
        width="95%"
      >
        <Typography>{file.file.name}</Typography>
      </Box>
      <Box width="12%">
        {isLoading ? (
          <LoadingIndicator containerHeight="1" size="1rem" />
        ) : (
          <Box display="flex" justifyContent="center" flexDirection="row">
            <Tooltip placement="bottom" title="Edit Filename">
              <IconButton>
                {isSuccess ? (
                  <BsCheckCircle size="15" color={theme.palette.success.main} />
                ) : (
                  <BsXCircle size="15" color={theme.palette.error.main} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip placement="bottom" title="Delete File">
              <IconButton onClick={() => handleFileDelete(file?.fileId ?? '')}>
                <BsTrash size="15" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
}

DropZoneFileList.defaultProps = {
  isSuccess: false,
  isLoading: false,
};

export default DropZoneFileList;
