/// <reference types="vite/client" />

/**
 * By default, Vite provides type definitions for import.meta.env in vite/client.d.ts.
 * Default Type definitions: MODE, BASE_URL, PROD, DEV, SSR
 *
 * Too get TypeScript IntelliSense for user-defined env variables (prefixed with VITE_),
 * include them in the `ImportMetaEnv` below.
 *
 * More about env in Vite: https://vitejs.dev/guide/env-and-mode.html
 *
 */

interface ImportMetaEnv {
  readonly VITE_APP_ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
