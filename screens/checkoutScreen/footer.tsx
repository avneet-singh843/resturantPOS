import React, { useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export const Footer = ({ cartItems, calculateTotal }) => {
  const refRBSheet = useRef();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // State to track selected payment method

  const paymentMethods = [
    { method: "Credit Card", icon: "card-outline" },
    { method: "PayPal", icon: "logo-paypal" },
    { method: "Cash on Delivery", icon: "cash-outline" },
  ];

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method); // Set selected payment method
  };

  return (
    <>
      <View className="flex-row justify-between items-center px-5 py-4 border-t border-gray-200 bottom-0 right-0 left-0">
        <View>
          <Text className="text-lg font-bold text-gray-800">
            Total: ${calculateTotal().toFixed(2)}
          </Text>
          <Pressable onPress={() => refRBSheet.current.open()}>
            <Text className="text-sm text-blue-600">
              {selectedPaymentMethod
                ? `Payment: ${selectedPaymentMethod}`
                : "Choose Payment Method"}
            </Text>
          </Pressable>
        </View>

        <Pressable className="bg-blue-500 py-2 px-4 rounded-full">
          <Text className="text-white text-base font-bold">
            Place Order (
            {cartItems.length > 0 ? Object.keys(cartItems[0]).length - 1 : 0})
          </Text>
        </Pressable>
      </View>

      {/* Bottom Sheet with animationType set to 'slide' */}
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true} // For smoother animations
        animationType="slide" // Animation for open/close
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)", // Background overlay
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: "43%", // Adjust height
          },
        }}
      >
        <View className="p-5 pb-20">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Select Payment Method
          </Text>

          {/* Map through payment methods */}
          {paymentMethods.map((payment, index) => (
            <Pressable
              key={index}
              className={`flex-row items-center justify-between p-4 mb-3 rounded-md ${
                selectedPaymentMethod === payment.method
                  ? "border-2 border-blue-500 bg-gray-100"
                  : "bg-gray-100"
              }`}
              onPress={() => handleSelectPaymentMethod(payment.method)} // Select payment method
            >
              <Text className="text-base text-gray-800">{payment.method}</Text>
              <Ionicons name={payment.icon} size={24} color="#007bff" />
            </Pressable>
          ))}

          <Pressable
            className="bg-blue-600 p-3 mb-3 rounded-md items-center justify-center"
            onPress={() => {
              refRBSheet.current.close(); // Close the bottom sheet
            }}
          >
            <Text className="text-white font-bold text-lg">Done</Text>
          </Pressable>
        </View>
      </RBSheet>
    </>
  );
};
