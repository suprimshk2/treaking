import {
  Box,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';

import { IAdoptQuiz, Option } from '../interfaces';

const COLS_NO_IN_COLLAPSIBLE_TABLE = 12;

interface IProps {
  open: boolean;
  data: IAdoptQuiz;
}

export function QuizTableRowCollapsible({ open, data }: IProps): JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();

  return (
    <TableCell
      className="no-padding"
      colSpan={COLS_NO_IN_COLLAPSIBLE_TABLE}
      style={{
        padding: theme.spacing(3),
      }}
    >
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer component={Paper} sx={{ backgroundColor: 'inherit' }}>
          <Table aria-label="simple table" sx={{ minWidth: 650 }}>
            <TableBody>
              <TableRow
                key={data._id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <Typography variant="bodyTextLarge" color="shade.darker">
                  {data?.description}
                </Typography>
                <Box pt={theme.spacing(2)}>
                  <Typography
                    variant="bodyTextSmall"
                    color="shade.dark"
                    mb={theme.spacing(1)}
                  >
                    Answers
                  </Typography>

                  <Box pl={2}>
                    {data?.options?.map((option: Option, index) => (
                      <Box key={option.id}>
                        <Typography
                          variant="bodyTextMedium"
                          color={
                            option?.id === data?.correctOptionId
                              ? theme.palette.success.light
                              : 'shade.dark'
                          }
                        >
                          {option?.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </TableCell>
  );
}
