import { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import {
  getFileNameWithExtension,
  getFilenameWithoutExtension,
} from 'shared/utils/file';
import { BsCheckCircle, BsTrash } from 'react-icons/bs';
import { IFileSchema } from 'features/quiz/interfaces';
import { LoadingIndicator } from '../display/LoadingIndicator';

function DropZoneFileList({
  isLoading = true,
  file,
  handleFileDelete,
  handleFileEdit,
}: {
  isLoading?: boolean;
  file: IFileSchema;
  handleFileDelete: (id: string) => void;
  handleFileEdit?: (file: any) => void;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const theme = useTheme();

  const borderColor = file.error
    ? theme.palette.error.main
    : theme.palette.primary.main;

  const handleSave = () => {
    const modifiedName = getFileNameWithExtension(file.name, name);
    const info = {
      ...file,
      name: modifiedName,
    };
    setIsEditMode(false);
    handleFileEdit(info);
  };

  const handleCancel = () => setIsEditMode(false);

  useEffect(() => {
    if (isEditMode) {
      const nameWithoutExtension = getFilenameWithoutExtension(file.name);
      setName(nameWithoutExtension);
    }
  }, [file.name, isEditMode]);

  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      key={file.id}
      marginBottom={1}
    >
      <Box textAlign={name ? 'right' : 'center'} width="12%">
        {isLoading ? (
          <LoadingIndicator containerHeight="1" size="1rem" />
        ) : (
          <Box display="flex" justifyContent="center" flexDirection="row">
            <Tooltip placement="bottom" title="Edit Filename">
              <IconButton onClick={() => handleFileDelete(file.id)}>
                <BsCheckCircle size="15" color={theme.palette.success.main} />
              </IconButton>
            </Tooltip>
            <Tooltip placement="bottom" title="Delete File">
              <IconButton onClick={() => handleFileDelete(file.id)}>
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
  isLoading: false,
  handleFileEdit: () => {},
};

export default DropZoneFileList;
