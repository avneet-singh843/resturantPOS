import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native";

export const LandingScreen = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Pressable>
        <Text>Lets Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
};
