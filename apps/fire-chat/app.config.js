import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    android: {
      ...config.android,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      
    },
    ios: {
      ...config.ios,
      googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
    },
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            buildToolsVersion: '34.0.0',
            kotlinVersion: '1.6.10'
          },
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
      '@react-native-firebase/firestore',
      '@react-native-firebase/storage',
      '@react-native-firebase/messaging',
      '@react-native-firebase/functions',
      '@react-native-firebase/analytics',
      '@react-native-firebase/crashlytics',
    ],
  };
};