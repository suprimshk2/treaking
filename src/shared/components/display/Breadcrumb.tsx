import { Typography } from '@mui/material';

interface IProps {
  text: string;
}

export function BreadCrumb({ text }: IProps) {
  return <Typography variant="bodyTextLargeMd">{text}</Typography>;
}
