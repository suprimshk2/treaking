import { useEffect } from 'react';

import axios from 'axios';
import { clearBrowserCaches, semverGreaterThan } from 'shared/utils/misc';

import packageJson from '../../../package.json';

function CacheBuster() {
  useEffect(() => {
    axios.get('/version.json').then(({ data }) => {
      const latestVersion = data.version;
      const currentVersion = packageJson.version;

      const shouldForceRefresh = semverGreaterThan(
        latestVersion,
        currentVersion
      );
      if (shouldForceRefresh) {
        clearBrowserCaches();
        window.location.reload();
      }
    });
  }, []);

  return null;
}

export default CacheBuster;
