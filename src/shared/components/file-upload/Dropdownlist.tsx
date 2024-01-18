import React, { useEffect, useState } from 'react';

import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  getFileNameWithExtension,
  getFilenameWithoutExtension,
} from 'shared/utils/file';
import { BsPencil, BsSave, BsTrash } from 'react-icons/bs';
import { IFileSchema } from 'features/quiz/interfaces';

function DropZoneFileList({
  file,
  handleFileDelete,
  handleFileEdit,
}: {
  file: IFileSchema;
  handleFileDelete: (id: string) => void;
  handleFileEdit: (file: any) => void;
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
  const handleEdit = () => {
    setIsEditMode(true);
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
      <Box
        sx={{
          textAlign: 'left',
        }}
        width="95%"
      >
        {isEditMode ? (
          <TextField
            autoFocus
            fullWidth
            name="name"
            onChange={(e) => setName(e.target.value.trim())}
            value={name}
            variant="standard"
          />
        ) : (
          <Typography>{file.name}</Typography>
        )}
      </Box>
      <Box textAlign={name ? 'right' : 'center'} width="12%">
        {isEditMode ? (
          <Box display="flex" justifyContent="center" flexDirection="row">
            {name && (
              <IconButton onClick={handleSave}>
                <BsSave size="15" />
              </IconButton>
            )}
            <IconButton onClick={handleCancel}>
              <BsTrash size="15" />
            </IconButton>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" flexDirection="row">
            <Tooltip placement="bottom" title="Edit Filename">
              <IconButton onClick={handleEdit}>
                <BsPencil size="15" />
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

export default DropZoneFileList;
