import React, { lazy } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { clearBrowserCaches } from 'shared/utils/misc';
import { getLocal, setLocal } from 'shared/utils/storage';
import ErrorBoundary from './error-boundary';

const loadComponentWithWrapper =
  // eslint-disable-next-line react/display-name, react/function-component-definition
  (Component: React.ComponentType) => (props: any) =>
    (
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <React.Suspense fallback="...">
            <ErrorBoundary onReset={reset}>
              <Component {...props} />
            </ErrorBoundary>
          </React.Suspense>
        )}
      </QueryErrorResetBoundary>
    );

const lazyImportWithRetry = (componentImport: any) =>
  loadComponentWithWrapper(
    lazy(async () => {
      const isForceRefreshed = getLocal('force-refreshed', true) || false;
      try {
        const component = await componentImport();
        setLocal('force-refreshed', 'false');
        return component;
      } catch (error) {
        if (!isForceRefreshed) {
          clearBrowserCaches();
          setLocal('force-refreshed', 'true');
          window.location.reload();
        }

        throw error;
      }
    })
  );

export { lazyImportWithRetry };
