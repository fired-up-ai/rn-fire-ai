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

export default withProviders;