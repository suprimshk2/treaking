import { Box } from '@mui/material';
import Image from '../../assets/svg/Logo.svg';
import MotionBox from './MotionBox';

function Motion() {
  return (
    <MotionBox
      animate={{ y: 16, scale: 1 }}
      transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
      mb={10}
    >
      <Box component="img" src={Image} alt="holista therapy" width={200} />
    </MotionBox>
  );
}

export default Motion;
