import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

// Hide the native splash immediately — we render our own JS splash
// below instead, because Expo Go cannot apply the native
// expo-splash-screen config plugin (that only works in a prebuilt /
// dev-client / production build). Rendering our own logo screen here
// works identically in Expo Go, web, and real builds.
SplashScreen.preventAutoHideAsync().catch(() => {});

// Login page intentionally NOT wired in — app opens straight to the
// bottom tabs (Bookshelf) after this splash. Add an auth check here
// later if needed.
export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Put any real startup work here later (loading fonts,
        // checking cached session, etc). This delay just gives the
        // splash a moment to show instead of an instant flash.
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync().catch(() => {});
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {}, []);

  if (!appIsReady) {
    return (
      <View style={styles.splash} onLayout={onLayoutRootView}>
        <StatusBar style="light" />
        <Image
          source={require("../assets/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.splashTitle}>CONFIDO ISLAMIC BOOKS</Text>
        <Text style={styles.splashSubtitle}>A World of Knowledge</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: COLORS.darkGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 210,
    height: 210,
  },
  splashTitle: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1,
    color: COLORS.gold,
    textAlign: "center",
  },
  splashSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.cream,
    textAlign: "center",
  },
});