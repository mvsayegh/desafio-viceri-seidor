import { appInfo, applicationBase } from './environment.common';

export const environment = {
  appInfo,
  application: {
    ...applicationBase,
    angular: `${applicationBase.angular} HML`,
  },
  config: {
    production: false,
    url: 'https://localhost:44304/',
  },
};
