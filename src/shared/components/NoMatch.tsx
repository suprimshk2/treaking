import { useEffect } from 'react';

import { useErrorBoundary } from 'shared/components/error-boundary';

// Component for showing '404 page not found' message
function NoMatch() {
  const { triggerError } = useErrorBoundary();
  useEffect(() => {
    triggerError({ message: 'Not Found', status: 404 });
  }, [triggerError]);

  return null;
}

export default NoMatch;
