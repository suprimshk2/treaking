import { Avatar as MuiAvatar, SxProps, Tooltip } from '@mui/material';
import {
  getColorFromString,
  getFirstAndLastNameOnly,
  getFirstLetterOfFirstAndLastName,
} from 'shared/utils/misc';

interface IProps {
  title?: string;
  src?: string;
  avatarstyle?: SxProps;
  alt?: string;
  className?: string;
  tooltip?: boolean;
}

function Avatar({ title, src, avatarstyle, alt, className, tooltip }: IProps) {
  const name = getFirstAndLastNameOnly(title || '');
  const backgroundColor = getColorFromString(name?.trim() ?? '');
  const styles = {
    ...avatarstyle,
    backgroundColor,
  };
  return tooltip ? (
    <Tooltip arrow title={name?.trim() || 'Not Available'}>
      <MuiAvatar src={src} sx={styles} alt={alt} className={className}>
        {getFirstLetterOfFirstAndLastName(name?.trim() || '') || 'N/A'}
      </MuiAvatar>
    </Tooltip>
  ) : (
    <MuiAvatar src={src} sx={styles} alt={alt} className={className}>
      {getFirstLetterOfFirstAndLastName(name?.trim() || 'N/A')}
    </MuiAvatar>
  );
}

Avatar.defaultProps = {
  title: '',
  src: '',
  avatarstyle: {},
  alt: '',
  className: '',
  tooltip: false,
};

export default Avatar;
