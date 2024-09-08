import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native";

export const CheckoutScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Checkout Screen</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("Menu");
        }}
      >
        <Text>Place Order</Text>
      </Pressable>
    </SafeAreaView>
  );
};
