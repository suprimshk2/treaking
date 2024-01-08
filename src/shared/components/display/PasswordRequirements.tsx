import { Typography, Stack, Box } from '@mui/material';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function PasswordRequirements() {
  return (
    <>
      <Typography variant="bodyTextLargeMd" mt={6}>
        Password Requirement
      </Typography>

      <Stack mt={4} gap={4}>
        <Box display="flex" gap={4}>
          <Box component="span" color="primary.main" mt={1}>
            <AiOutlineCheckCircle size={16} />
          </Box>
          <Typography variant="bodyTextMedium" color="gray.dark">
            Password must be at least 8 characters including at least one
            uppercase, special character i.e #@! and a number
          </Typography>
        </Box>

        <Box display="flex" gap={4}>
          <Box component="span" color="primary.main" mt={1}>
            <AiOutlineCheckCircle size={16} />
          </Box>
          <Typography variant="bodyTextMedium" color="gray.dark">
            New Password and Confirm Password should match
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

export default PasswordRequirements;
