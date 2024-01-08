import { Typography, TypographyProps } from '@mui/material';
import { parseHtml } from 'shared/utils/misc';

type IHTMLParserProps = {
  content: string;
  chars?: number;
} & TypographyProps;

export function HTMLParser({
  content,
  chars,
  ...typographyProps
}: IHTMLParserProps) {
  return (
    <Typography
      {...typographyProps}
      dangerouslySetInnerHTML={{
        __html: parseHtml(content, chars),
      }}
    />
  );
}

HTMLParser.defaultProps = {
  chars: undefined,
};
