import { Box, Button, Stack, Typography } from '@mui/material';
import { IComposeError } from 'shared/interfaces/http';
import { clearBrowserCaches } from 'shared/utils/misc';
import { setLocal } from 'shared/utils/storage';

export interface IErrorFallback extends IComposeError {
  resetError(): void;
}

// function siteUnderConstructionMessage(message?: string) {
//   if (
//     message &&
//     message.includes('Failed to fetch dynamically imported module')
//   ) {
//     return 'Site under maintenance! Please refresh the page.';
//   }

//   return message;
// }

function ErrorFallBack(props: IErrorFallback) {
  const { message, status, resetError } = props;

  const isDynamicImportIssue =
    message && message.includes('Failed to fetch dynamically imported module');
  return (
    <Box
      alignItems="center"
      display="flex"
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Stack spacing={6}>
        <Typography variant="h6">
          {!isDynamicImportIssue && (
            <span>
              {status?.toString() || ''}
              {!!status && !!message && ' | '}
              {message?.toString() || ''}
            </span>
          )}
          {/* {siteUnderConstructionMessage(message?.toString())} */}
        </Typography>
        {status !== 404 && !isDynamicImportIssue ? (
          <Button
            onClick={() => {
              resetError();
              if (isDynamicImportIssue) {
                clearBrowserCaches();
                setLocal('force-refreshed', 'true');
                window.location.reload();
              }
            }}
          >
            Retry
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
}

export default ErrorFallBack;
