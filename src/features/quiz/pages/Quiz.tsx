import { Box, useTheme } from '@mui/material';

import { useState } from 'react';

import useDisclosure from 'shared/hooks/useDisclosure';
// import { RolesAddEditModal } from 'features/settings/roles-and-permissions/components/RolesAddEditModal';
import uiRoute from 'shared/constants/uiRoute';
import { useNavigate } from 'react-router-dom';
import QuizTable from '../components/QuizTable';
import { QuizTableBanner } from '../components/QuizTableBanner';

export function QuizList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState('');
  const { onOpen, isOpen } = useDisclosure();
  // const onEditClick = (id: string) => {
  //   onOpen();
  //   setRoleId(id);
  // };
  return (
    <Box pb={2}>
      <Box sx={{ paddingX: theme.spacing(4) }}>
        <QuizTableBanner
          onAddClick={() => {
            navigate(uiRoute.addQuiz);
          }}
        />
        <QuizTable />
        {/* {isOpen && <RolesAddEditModal editRoleId={roleId} onClose={() => {}} />} */}
      </Box>
    </Box>
  );
}
