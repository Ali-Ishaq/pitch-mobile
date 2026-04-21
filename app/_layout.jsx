import { useEffect } from "react";
import { Stack, router, usePathname } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import store from "../src/store/store";
import { selectAuthRole, selectIsAuthenticated } from "../src/store/authSlice";
import { canAccessPath, getDefaultRouteForRole, isPublicRoute } from "../src/routing/roleRouting";

function RootNavigator() {
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectAuthRole);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const currentPath = pathname;
    const roleHome = getDefaultRouteForRole(role);

    if (!isAuthenticated) {
      if (!isPublicRoute(currentPath)) {
        router.replace("/login");
      }
      return;
    }

    if (isPublicRoute(currentPath)) {
      if (currentPath !== roleHome) {
        router.replace(roleHome);
      }
      return;
    }

    if (!canAccessPath(role, currentPath)) {
      router.replace(roleHome);
    }
  }, [isAuthenticated, pathname, role]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen name="customer" options={{ headerShown: false }} />
      <Stack.Screen name="owner" options={{ headerShown: false }} />
      {/* <Stack.Screen name="admin" options={{ headerShown: false }} /> */}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
          <RootNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
