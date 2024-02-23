import { envConstants } from 'shared/constants/env';

interface IConfig {
  baseURL: string;
  appBaseURL: string;
  socketBaseURL: string;
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
    appBaseURL: 'http://localhost:4200',
    // baseURL: 'https://dev.api.therapy.noveltytechnology.com/api',
    // appBaseURL: 'https://dev.therapy.noveltytechnology.com',
    socketBaseURL: 'https://dev.api.therapy.noveltytechnology.com',
  },
  DEV: {
    baseURL: 'https://dev.api.meromakaii.com/api',
    // baseURL: 'https://dev.api.therapy.noveltytechnology.com/api',
    appBaseURL: 'https://dev.therapy.noveltytechnology.com',
    socketBaseURL: 'https://dev.api.therapy.noveltytechnology.com',
  },
  QA: {
    baseURL: 'https://qa.api.meromakaii.com/api',
    appBaseURL: 'https://qa.therapy.noveltytechnology.com',
    socketBaseURL: 'https://qa.api.therapy.noveltytechnology.com',
  },
  UAT: {
    baseURL: 'https://uat.api.therapy.noveltytechnology.com/api',
    appBaseURL: 'https://uat.therapy.noveltytechnology.com',
    socketBaseURL: 'https://uat.api.therapy.noveltytechnology.com',
  },
  PROD: {
    baseURL: 'https://api.meromakaii.com/api',
    appBaseURL: 'https://dev.therapy.noveltytechnology.com',
    socketBaseURL: 'https://dev.api.therapy.noveltytechnology.com',
  },
};

const modeConfig = mode[(envConstants.ENVIRONMENT as keyof IMode) || 'DEV'];

const config: IConfig = {
  ...modeConfig,
};

export default config;
