import { envConstants } from 'shared/constants/env';

interface IConfig {
  baseURL: string;
}

interface IMode {
  LOCAL: IConfig;
  DEV: IConfig;
  QA: IConfig;
  UAT: IConfig;
  PROD: IConfig;
}

const mode: IMode = {
  LOCAL: {
    baseURL: 'http://localhost:3000/api',
  },
  DEV: {
    baseURL: '',
  },
  QA: { baseURL: '' },
  UAT: {
    baseURL: '',
  },
  PROD: {
    baseURL: '',
  },
};

const modeConfig = mode[(envConstants.ENVIRONMENT as keyof IMode) || 'DEV'];

const config: IConfig = {
  ...modeConfig,
};

export default config;
