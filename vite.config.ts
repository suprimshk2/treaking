/**
 * This is a configuration file for the Vite build tool.
 * Allows you to customize various aspects of the build process and set up the development environment to suit your needs.
 */

/* eslint-disable import/no-extraneous-dependencies */
// Vite should be installed as a dev dependency.
// However, you have such dependency for vite in actual react code, then, you may want to consider to move it to dependency.

/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, 'environments');

  return {
    plugins: [
      react(), // Vite Plugin for React
      viteTsconfigPaths(), // Tells Vite how to resolve absolute paths from the tsconfig file
      svgrPlugin(), // Lets you import SVGs as React Components
    ],
    server: {
      port: +env.VITE_APP_PORT || 4200, // App runs in this PORT
    },
    envDir: 'environments', // Tells Vite frm where the env variables are to be read
    build: {
      outDir: 'build', // Set the build output directory to a build folde
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
    },
  };
});
