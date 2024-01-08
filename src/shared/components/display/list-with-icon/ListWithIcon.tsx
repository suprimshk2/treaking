import { Box } from '@mui/material';
import { IListWithIconItem } from 'shared/interfaces/misc';
import { ListWithIconItem } from './ListWithIconItem';

interface IProps {
  list: IListWithIconItem[];
}

export function ListWithIcon({ list }: IProps): JSX.Element {
  return (
    <Box component="ul" sx={{ listStyle: 'none' }}>
      {list.map((item, index) => (
        <ListWithIconItem item={item} key={item.id} isFirstItem={index === 0} />
      ))}
    </Box>
  );
}
