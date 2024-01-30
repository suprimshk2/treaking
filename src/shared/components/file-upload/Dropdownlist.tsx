import { Box, IconButton, Skeleton, Tooltip, useTheme } from '@mui/material';
import { BsCheckCircle, BsTrash, BsXCircle } from 'react-icons/bs';
import { IFilePayload } from 'features/product/interfaces';
import { LoadingIndicator } from '../display/LoadingIndicator';

function DropZoneFileList({
  url,
  isSuccess = false,
  isLoading = true,
  file,
  handleFileDelete,
}: {
  url?: string;
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
      height={50}
      alignItems="center"
      bgcolor={theme.palette.common.white}
      py={8}
    >
      <Box width="95%" px={1}>
        {isLoading ? (
          <Skeleton variant="rounded" width={50} height={50} />
        ) : (
          <img
            srcSet={`${url}?w=50&fit=crop&auto=format&dpr=2 2x`}
            src={`${url}`}
            alt={file?.file?.name ?? file.url}
            loading="lazy"
            width={50}
            height={50}
          />
        )}
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
  url: '',
};

export default DropZoneFileList;
