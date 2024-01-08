/* eslint-disable import/no-extraneous-dependencies */
// It is safe to disable this rule in this file because these dependencies are only for tests
// and it's not the code that runs when the app is deployed.

import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
