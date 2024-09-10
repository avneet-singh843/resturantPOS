import React, { useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../cartContext";
const apiBaseUrl = "http://192.168.1.34:3000";

export const Footer = ({ navigation, calculateTotal }) => {
  const { cartItems, clearCart } = useCart();
  const refRBSheet = useRef();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const paymentMethods: {
    method: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    { method: "Credit Card", icon: "card-outline" },
    { method: "PayPal", icon: "logo-paypal" },
    { method: "Cash on Delivery", icon: "cash-outline" },
  ];

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/orders`, {
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
      clearCart();
      navigation.navigate("OrderPlaced");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <View className="flex-row justify-between items-center px-5 py-4 border-t border-gray-200 bottom-0 right-0 left-0">
        <View>
          <Text className="text-lg font-bold text-gray-800">
            Total: ${calculateTotal().toFixed(2)}
          </Text>
          <Pressable
            onPress={() => refRBSheet.current && refRBSheet.current.open()}
          >
            <Text className="text-sm text-blue-600">
              {selectedPaymentMethod
                ? `Payment: ${selectedPaymentMethod}`
                : "Choose Payment Method"}
            </Text>
          </Pressable>
        </View>

        <Pressable
          className="bg-blue-500 py-2 px-4 rounded-full"
          onPress={handlePlaceOrder}
        >
          <Text className="text-white text-base font-bold">Place Order </Text>
        </Pressable>
      </View>

      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: "43%",
          },
        }}
      >
        <View className="p-5 pb-20">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Select Payment Method
          </Text>

          {paymentMethods.map((payment, index) => (
            <Pressable
              key={index}
              className={`flex-row items-center justify-between p-4 mb-3 rounded-md ${
                selectedPaymentMethod === payment.method
                  ? "border-2 border-blue-500 bg-gray-100"
                  : "bg-gray-100"
              }`}
              onPress={() => handleSelectPaymentMethod(payment.method)}
            >
              <Text className="text-base text-gray-800">{payment.method}</Text>
              <Ionicons name={payment.icon} size={24} color="#007bff" />
            </Pressable>
          ))}

          <Pressable
            className="bg-blue-600 p-3 mb-3 rounded-md items-center justify-center"
            onPress={() => {
              refRBSheet.current && refRBSheet.current.close();
            }}
          >
            <Text className="text-white font-bold text-lg">Done</Text>
          </Pressable>
        </View>
      </RBSheet>
    </>
  );
};
