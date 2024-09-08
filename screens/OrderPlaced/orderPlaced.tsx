import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
const orderPlaced = require("../../assets/orderPlaced.jpg");

export const OrderPlaced = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white items-center justify-center p-6 rounded-lg">
      <Image
        source={orderPlaced}
        className="w-64 h-64 mb-8 rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold mb-4">
        Order Placed Successfully! 🎉
      </Text>
      <TouchableOpacity
        className="py-3 px-6"
        onPress={() => navigation.navigate("Landing")}
      >
        <Text className="text-blue-500 font-semibold text-base">
          Continue Shopping
        </Text>
      </TouchableOpacity>
    </View>
  );
};
