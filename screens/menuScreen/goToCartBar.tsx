import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";

const GoToCartBar = ({ cartItems, setCartItems, navigation }) => {
  let price = 0;

  Object.values(cartItems).forEach((item) => {
    const itemPrice = parseFloat(item.price.replace("$", ""));
    price += item.quantity * itemPrice;
  });

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://192.168.1.34:3000/cartItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      if (!response.ok) {
        throw new Error("Failed to post cart items");
      }

      const responseData = await response.json();
      console.log("Checkout successful:", responseData);

      navigation.navigate("CheckoutScreen");
      setCartItems({});
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const { height } = Dimensions.get("window");
  const { width } = Dimensions.get("window");

  return (
    <View className="absolute left-0 right-0" style={{ bottom: height * 0.01 }}>
      <View className="bg-white p-4 rounded-3xl shadow-lg flex-row justify-between items-center">
        <View>
          <Text className="text-gray-500 text-lg">Total Amount</Text>
          <Text className="text-black text-2xl font-bold">
            ${price.toFixed(2)}
          </Text>
        </View>
        <Pressable
          className={`bg-blue-500 ${
            width > 350 ? "py-3 px-6" : "py-2 px-4"
          } rounded-full`}
          onPress={handleCheckout}
        >
          <Text
            className={`text-white ${width > 350 ? "text-lg" : "text-base"}`}
          >
            Go to Cart
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GoToCartBar;
