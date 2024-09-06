import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { MenuScreen } from "./screens/menuScreen/menuScreen";

export default function App() {
  return (
    <SafeAreaView>
      <MenuScreen />
    </SafeAreaView>
  );
}
