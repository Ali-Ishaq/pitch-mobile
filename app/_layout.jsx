import { Stack } from "expo-router";
import { Provider } from "react-redux";

import store from "../src/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="welcome" options={{ headerShown: false }} /> */}
        <Stack.Screen name="login" options={{ headerShown: false  }} />
        <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
