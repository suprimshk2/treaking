/* eslint-disable import/no-extraneous-dependencies */

import { cleanup, render } from '@testing-library/react';
import { Suspense } from 'react';
import { afterEach } from 'vitest';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockTheme } from './mockTheme';

afterEach(() => {
  cleanup();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
  logger: {
    // eslint-disable-next-line no-console
    log: console.log,
    // eslint-disable-next-line no-console
    warn: console.warn,
    // ✅ no more errors on the console for tests
    // eslint-disable-next-line no-console
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
});

function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>;
}

interface IProvidersProps {
  children: React.ReactNode;
}

function Providers({ children }: IProvidersProps) {
  return (
    <Suspense fallback={null}>
      <ThemeModeProvider>
        <SnackbarProvider autoHideDuration={20} maxSnack={1}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>{children}</BrowserRouter>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeModeProvider>
    </Suspense>
  );
}

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => <Providers>{children}</Providers>,
    ...options,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
