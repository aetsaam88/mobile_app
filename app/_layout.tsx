import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/theme";

// Login page intentionally NOT wired in — app opens straight to the
// bottom tabs (Bookshelf). Add an auth check here later if needed.
export default function RootLayout() {
  return (
    <>
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
    </>
  );
}
