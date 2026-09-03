import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { COLORS } from "../constants/theme";

// Prevent auto-hiding native splash until layout mounts, then hide immediately
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    // Hide native splash screen as soon as RootLayout mounts
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="reader/[bookId]"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: COLORS.darkGreen },
            headerTintColor: COLORS.cream,
            headerTitleStyle: { color: COLORS.cream },
          }}
        />
      </Stack>
    </View>
  );
}