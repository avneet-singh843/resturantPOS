import React from "react";
import { View, Text } from "react-native";

export const BillDetails = ({ calculateTotal }) => {
  const amount = calculateTotal().toFixed(2);
  return (
    <View className="p-4 bg-white rounded-lg shadow-md">
      <Text className="text-lg font-bold mb-4">Bill details</Text>

      <View className="flex-row items-center mb-3">
        <View className="w-6 mr-2">
          <Text>📃</Text>
        </View>
        <Text className="flex-1 text-base">Items total</Text>
        <Text className="text-base font-medium">
          ${(amount - amount * 0.1).toFixed(2)}
        </Text>
      </View>

      <View className="flex-row items-center mb-3">
        <View className="w-6 mr-2">
          <Text>🔧</Text>
        </View>
        <Text className="flex-1 text-base">Taxes</Text>
        <Text className="text-base font-medium">
          ${(amount * 0.09).toFixed(2)}
        </Text>
      </View>

      <View className="flex-row items-center mb-1">
        <View className="w-6 mr-2">
          <Text>🛒</Text>
        </View>
        <Text className="flex-1 text-base">Packing charge</Text>
        <Text className="text-base font-medium">
          ${(amount * 0.01).toFixed(2)}
        </Text>
      </View>

      <View className="flex-row justify-between items-center pt-4 border-t border-gray-200">
        <Text className="text-lg font-bold">Grand total</Text>
        <Text className="text-lg font-bold">$ {amount}</Text>
      </View>
    </View>
  );
};
