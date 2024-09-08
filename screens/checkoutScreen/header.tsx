import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export const Header = ({ navigation, clearCart }) => {
  return (
    <View className="flex-row justify-between items-center px-5 py-3 border-b border-gray-200">
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </Pressable>
      <Text className="text-xl font-bold text-gray-800">Cart</Text>
      <Pressable onPress={clearCart}>
        <Ionicons name="trash-outline" size={24} color="#333" />
      </Pressable>
    </View>
  );
};
