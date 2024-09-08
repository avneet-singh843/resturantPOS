import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Animated,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Cuisines } from "./cuisines";

const API_BASE_URL = "http://192.168.1.34:3000";

const MenuItem = ({ item }) => (
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
        <TouchableOpacity className="bg-blue-500 rounded-full w-7 h-7 items-center justify-center">
          <Text className="text-white text-xl font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export const MenuScreen = ({ navigation }) => {
  const [selectedCuisine, setSelectedCuisine] = useState("Italian");
  const [cuisines, setCuisines] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchCuisines = async () => {
    setIsLoading(true);
    fadeAnim.setValue(0);
    try {
      const response = await fetch(`${API_BASE_URL}/${selectedCuisine}`);
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
      console.error("Error fetching cuisines:", error);
      setError(`Failed to fetch cuisines: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, [selectedCuisine]);

  return (
    <SafeAreaView>
      <ScrollView className="bg-gray-50" stickyHeaderIndices={[0]}>
        <Text className="bg-blue-500 text-white text-xl font-bold p-4 text-center">
          The Urban Cafe
        </Text>

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
              <MenuItem key={item.name} item={item} />
            ))}
          </Animated.View>
        )}

        <Pressable onPress={() => navigation.navigate("CheckoutScreen")}>
          <Text>Checkout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
