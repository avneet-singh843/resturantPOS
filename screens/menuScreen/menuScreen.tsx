import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Cuisines } from "./cuisines";
import { MenuItem } from "./menuItem";
import GoToCartBar from "./goToCartBar";
import { FoodAdvertisement } from "./foodAdvertisement";
import Header from "./header";

import { API_BASE_URL } from "@env";
const apiBaseUrl = API_BASE_URL;

export const MenuScreen = ({ navigation }) => {
  const [selectedCuisine, setSelectedCuisine] = useState("Italian");
  const [cuisines, setCuisines] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { height } = Dimensions.get("window");

  const fetchCuisines = async () => {
    setIsLoading(true);
    fadeAnim.setValue(0);
    try {
      const response = await fetch(`${apiBaseUrl}/${selectedCuisine}`);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      setCuisines(data);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      setError(`Failed to fetch cuisines: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, [selectedCuisine]);

  const incrementItem = (item) => {
    setCartItems((prevItems) => {
      const currentQty = prevItems[item.name]?.quantity || 0;
      return {
        ...prevItems,
        [item.name]: {
          ...item,
          quantity: currentQty + 1,
          selectedCuisine,
        },
      };
    });
  };

  const decrementItem = (item) => {
    setCartItems((prevItems) => {
      const currentQty = prevItems[item.name]?.quantity || 0;
      if (currentQty <= 1) {
        const { [item.name]: _, ...rest } = prevItems;
        return rest;
      }
      return {
        ...prevItems,
        [item.name]: {
          ...item,
          quantity: currentQty - 1,
          selectedCuisine,
        },
      };
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="bg-gray-50"
        stickyHeaderIndices={[0]}
        style={{ marginBottom: height * 0.08 }}
      >
        <Header />

        <FoodAdvertisement />

        <Cuisines
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text className="text-red-500 p-4">{error}</Text>
        ) : cuisines.length === 0 ? (
          <Text className="text-gray-500 p-4">
            No cuisines available for {selectedCuisine}
          </Text>
        ) : (
          <Animated.View
            style={{
              opacity: fadeAnim,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              padding: 8,
            }}
          >
            {cuisines.map((item) => (
              <MenuItem
                key={item.name}
                item={item}
                quantity={cartItems[item.name]?.quantity || 0}
                onIncrement={() => incrementItem(item)}
                onDecrement={() => decrementItem(item)}
              />
            ))}
          </Animated.View>
        )}
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0">
        <GoToCartBar
          cartItems={cartItems}
          setCartItems={setCartItems}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};
