import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import { CartItemCard } from "./cartItemCard";
import { Header } from "./header";
import { Footer } from "./footer";

export const CheckoutScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchCuisines = async () => {
    try {
      const response = await fetch("http://192.168.1.34:3000/cartItems");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const lastCartItem = data[data.length - 1];
      setCartItems(lastCartItem ? [lastCartItem] : []);
    } catch (error) {
      setError("Failed to fetch cuisines. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, []);

  const incrementQuantity = (key) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems[0] };
      updatedItems[key].quantity += 1;
      return [updatedItems];
    });
  };

  const decrementQuantity = (key) => {
    const updatedCartItems = [...cartItems];

    if (updatedCartItems[0][key].quantity > 1) {
      updatedCartItems[0][key].quantity -= 1;
    } else {
      // If quantity is zero, remove the item from the cart
      delete updatedCartItems[0][key];
    }

    setCartItems(updatedCartItems);
  };

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-base">{error}</Text>
      </SafeAreaView>
    );
  }

  const calculateTotal = () => {
    return cartItems.length > 0
      ? Object.keys(cartItems[0]).reduce((total, key) => {
          if (key !== "id") {
            const item = cartItems[0][key];
            return total + item.price * item.quantity;
          }
          return total;
        }, 0)
      : 0;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header navigation={navigation} clearCart={clearCart} />
      <ScrollView>
        <CartItemCard
          cartItems={cartItems}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      </ScrollView>
      <Footer cartItems={cartItems} calculateTotal={calculateTotal} />
    </SafeAreaView>
  );
};
