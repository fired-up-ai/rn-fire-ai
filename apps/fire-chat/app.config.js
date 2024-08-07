import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    android: {
      ...config.android,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    // ios: {
    //   ...config.ios,
    //   googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
    // },
  };
};