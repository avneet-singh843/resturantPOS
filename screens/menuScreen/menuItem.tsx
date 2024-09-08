import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const MenuItem = ({ item, quantity, onIncrement, onDecrement }) => (
  <View
    key={item.name}
    style={{ width: "48%", marginBottom: 16 }}
    className="bg-white rounded-lg overflow-hidden shadow-md"
  >
    <Image
      source={{ uri: item.image }}
      style={{ width: "100%", height: 120 }}
      resizeMode="cover"
    />
    <View className="p-2">
      <Text className="text-gray-900 font-semibold text-base mb-1 truncate">
        {item.name}
      </Text>
      <Text className="text-gray-600 text-xs mb-2" numberOfLines={2}>
        {item.description}
      </Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-800 font-bold text-base">{item.price}</Text>
        {quantity > 0 ? (
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={onDecrement}
              className="bg-red-500 rounded-full w-7 h-7 items-center justify-center"
            >
              <Text className="text-white text-xl font-bold">-</Text>
            </TouchableOpacity>
            <Text className="text-gray-800 font-bold text-base mx-2">
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={onIncrement}
              className="bg-blue-500 rounded-full w-7 h-7 items-center justify-center"
            >
              <Text className="text-white text-xl font-bold">+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={onIncrement}
            className="bg-blue-500 rounded-full w-7 h-7 items-center justify-center"
          >
            <Text className="text-white text-xl font-bold">+</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);
