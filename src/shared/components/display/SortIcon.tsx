import { Box, useTheme } from '@mui/material';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { SortOrder } from 'shared/enums';
import { SortOrderType } from 'shared/interfaces/misc';

interface IProps {
  type?: SortOrderType | '';
  dataCy?: string;
}

export function SortIcon({ type, dataCy }: IProps): JSX.Element {
  const theme = useTheme();

  const color =
    type === SortOrder.ASC || type === SortOrder.DESC
      ? theme.palette.gray.dark
      : theme.palette.gray.main;

  const getIcon = () => {
    if (type === SortOrder.ASC) {
      return FaSortUp;
    }
    if (type === SortOrder.DESC) {
      return FaSortDown;
    }
    return FaSort;
  };

  return (
    <Box
      component={getIcon()}
      data-cy={dataCy}
      ml={1}
      size={14}
      sx={{
        color,
      }}
    />
  );
}

SortIcon.defaultProps = {
  type: '',
  dataCy: '',
};
