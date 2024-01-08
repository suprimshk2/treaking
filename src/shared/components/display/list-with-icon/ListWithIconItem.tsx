import { Box, SvgIcon, Tooltip, Typography } from '@mui/material';
import { IListWithIconItem } from 'shared/interfaces/misc';
import { truncateText } from 'shared/utils/misc';

interface IProps {
  item: IListWithIconItem;
  isFirstItem: boolean;
}

export function ListWithIconItem({ item, isFirstItem }: IProps) {
  const Icon = item.icon;

  const textOverflowEllipseStyles = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const DEFAULT_TRUNCATE_LENGTH = 40;

  const truncateLength = item.truncateLength || DEFAULT_TRUNCATE_LENGTH;

  return (
    <Box
      component="li"
      key={item.text?.toString()}
      position="relative"
      ml="1.175rem"
      mt={isFirstItem ? 0 : 2}
    >
      {item.text && (
        <>
          <SvgIcon
            sx={{
              width: '14px',
              height: '14px',
              color: (theme) => theme.palette.shade.dark,
              position: 'absolute',
              top: '0.175rem',
              left: '-1.175rem',
            }}
          >
            <Icon />
          </SvgIcon>
          {item.tooltip ? (
            <Box sx={textOverflowEllipseStyles} component="div" ml={0.5}>
              <Tooltip arrow placement="top" title={item.text || ''}>
                <span>
                  {item.typographyProps ? (
                    <Typography {...item.typographyProps}>
                      {truncateText(item.text as string, truncateLength)}
                    </Typography>
                  ) : (
                    truncateText(item.text as string, truncateLength)
                  )}
                </span>
              </Tooltip>
            </Box>
          ) : (
            <Box sx={textOverflowEllipseStyles} component="div" ml={0.5}>
              {item.typographyProps ? (
                <Typography {...item.typographyProps}>{item.text}</Typography>
              ) : (
                item.text
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
