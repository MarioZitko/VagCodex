import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="decode/confirm" />
        <Stack.Screen name="decode/results" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
