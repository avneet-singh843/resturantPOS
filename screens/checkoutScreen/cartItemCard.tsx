import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../cartContext";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedCuisine: string;
}

export const CartItemCard: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const incrementQuantity = (itemName: string) => {
    const item = cartItems[itemName];
    if (item) {
      addToCart(item, item.selectedCuisine);
    }
  };

  const decrementQuantity = (itemName: string) => {
    const item = cartItems[itemName];
    if (item && item.quantity > 0) {
      removeFromCart(item);
    }
  };

  return (
    <View className="mx-5 my-5 mb-2">
      {Object.keys(cartItems).length > 0 ? (
        Object.entries(cartItems).map(([key, item]) => (
          <View
            key={key}
            className="flex-row bg-gray-100 p-4 mb-4 rounded-lg shadow-sm"
          >
            <Image
              source={{ uri: item.image }}
              className="w-16 h-16 rounded-md"
            />
            <View className="flex-1 ml-4 flex-row justify-between">
              <View>
                <Text className="text-lg font-bold text-gray-800">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-600">
                  {item.selectedCuisine}
                </Text>
                <Text className="text-sm text-gray-600">$ {item.price}</Text>
              </View>
              <View className="items-center justify-center">
                <Text className="text-base font-bold text-black">
                  ${item.price * item.quantity}
                </Text>
                <View className="flex-row items-center">
                  <TouchableOpacity onPress={() => incrementQuantity(key)}>
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color="#007bff"
                    />
                  </TouchableOpacity>
                  <Text className="mx-2 text-base text-gray-800">
                    {item.quantity}
                  </Text>
                  <TouchableOpacity onPress={() => decrementQuantity(key)}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color="#007bff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text className="text-base text-gray-600 text-center my-5">
          No items in cart
        </Text>
      )}
    </View>
  );
};
