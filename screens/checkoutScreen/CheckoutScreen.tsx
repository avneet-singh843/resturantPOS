import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CartItemCard } from "./cartItemCard";
import { Header } from "./header";
import { Footer } from "./footer";
import { RecommendationList } from "./recommendationList";
import { BillDetails } from "./billDetails";
import { useCart } from "../../cartContext";

const apiBaseUrl = "http://192.168.1.34:3000";

type RootStackParamList = {
  Checkout: undefined;
};

type CheckoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Checkout"
>;

interface CheckoutScreenProps {
  navigation: CheckoutScreenNavigationProp;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  navigation,
}) => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);

  // const fetchCartItems = async () => {
  //   try {
  //     const response = await fetch(`${apiBaseUrl}/cartItems`);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     // Assuming the API returns an array of cart items
  //     if (data.length > 0) {
  //       data.forEach((item: any) => addToCart(item, item.selectedCuisine));
  //     }
  //   } catch (error) {
  //     setError("Failed to fetch cart items. Please try again later.");
  //   }
  // };

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);

  const incrementQuantity = (itemName: string) => {
    const item = cartItems[itemName];
    if (item) {
      addToCart(item, item.selectedCuisine);
    }
  };

  const decrementQuantity = (itemName: string) => {
    const item = cartItems[itemName];
    if (item) {
      removeFromCart(item);
    }
  };

  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "#EF4444", fontSize: 16 }}>{error}</Text>
      </SafeAreaView>
    );
  }

  const calculateTotal = (): number => {
    return Object.values(cartItems).reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header navigation={navigation} clearCart={clearCart} />
      <ScrollView>
        <CartItemCard />
        <RecommendationList />
        <BillDetails calculateTotal={calculateTotal} />
      </ScrollView>
      <Footer navigation={navigation} calculateTotal={calculateTotal} />
    </SafeAreaView>
  );
};
