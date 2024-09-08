import React from "react";
import { View, Text, Pressable } from "react-native";

const CheckoutBar = ({ cartItems, navigation }) => {
  let price = 0;
  Object.values(cartItems).forEach((item) => {
    console.log({ item });
    const itemPrice = parseFloat(item.price.replace("$", ""));
    price += item.quantity * itemPrice;
  });
  return (
    <View className="absolute bottom-2 left-0 right-0">
      <View className="bg-white p-4 rounded-t-3xl shadow-lg flex-row justify-between items-center">
        <View>
          <Text className="text-gray-500 text-lg">Total Amount</Text>
          <Text className="text-black text-2xl font-bold">
            ${price.toFixed(2)}
          </Text>
        </View>
        <Pressable
          className="bg-blue-500 py-3 px-6 rounded-full"
          onPress={() => navigation.navigate("CheckoutScreen")}
        >
          <Text className="text-white text-lg">Check Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CheckoutBar;
