// @fired-up-ai/common-ui/src/hoc/withProviders.tsx
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { 
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme
} from 'react-native-paper';
import {store} from '@fired-up-ai/store';

const withProviders = (Component: any) => (props: any) => (
  <ReduxProvider store={store}>
    <PaperProvider>
      <Component {...props} />
    </PaperProvider>
  </ReduxProvider>
);

const withDarkPaper = (Component: any) => (props: any) => (
  <PaperProvider theme={MD3DarkTheme}>
    <Component {...props} />
  </PaperProvider>
);

const withLightPaper = (Component: any) => (props: any) => (
  <PaperProvider theme={MD3LightTheme}>
    <Component {...props} />
  </PaperProvider>
);

const withRedux = (Component: any) => (props: any) => (
  <ReduxProvider store={store}>
    <Component {...props} />
  </ReduxProvider>
);

const withPaper = (Component: any) => (props: any) => (
  <PaperProvider>
    <Component {...props} />
  </PaperProvider>
);



export { withProviders, withDarkPaper, withLightPaper, withRedux, withPaper };