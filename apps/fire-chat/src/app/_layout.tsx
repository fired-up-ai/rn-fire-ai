import { Stack } from "expo-router";
import { Slot } from 'expo-router';
import { Provider as StoreProvider } from "react-redux";
import { Provider as UIProvider, MD3DarkTheme } from "react-native-paper";
// import { SessionProvider } from '../ctx';
import store from "../store/store";

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#ff0000",

  },
};


export default function RootLayout() {
  return (
    <StoreProvider store={store}>
      <UIProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </UIProvider>
    </StoreProvider>
  );
}
