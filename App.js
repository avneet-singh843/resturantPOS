import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuScreen } from "./screens/menuScreen/menuScreen";
import { LandingScreen } from "./screens/landingScreen/landingScreen";

export default function App() {
  return (
    <SafeAreaView>
      <LandingScreen />
      <MenuScreen />
    </SafeAreaView>
  );
}
