import { Stack } from "expo-router";
import { Slot } from 'expo-router';
import { Provider as StoreProvider } from "react-redux";
import { Provider as UIProvider } from "react-native-paper";
// import { SessionProvider } from '../ctx';
import store from "../store/store";

export default function RootLayout() {
  return (
    <StoreProvider store={store}>
      <UIProvider>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </UIProvider>
    </StoreProvider>
  );
}
