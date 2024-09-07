import React from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { Cuisines } from "./cuisines";
import { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const MenuScreen = () => {
  const [selectedCuisine, setSelectedCuisine] = useState("Italian");
  const [cuisines, setCuisines] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchCuisines = async () => {
    setIsLoading(false);
    fadeAnim.setValue(0); // Reset the fade value
    try {
      console.log("Fetching cuisines...");
      const response = await fetch(
        `http://192.168.1.34:3000/${selectedCuisine}`
      );
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data fetched:", data);
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

  const renderItem = (item, index) => {
    return (
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
            <Text className="text-gray-800 font-bold text-base">
              {item.price}
            </Text>
            <TouchableOpacity className="bg-blue-500 rounded-full w-7 h-7 items-center justify-center">
              <Text className="text-white text-xl font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetchCuisines();
  }, [selectedCuisine]);

  return (
    <SafeAreaView>
      <ScrollView className="bg-gray-50">
        <Text className="bg-blue-500 text-white text-xl font-bold p-4 text-center">
          The Big Chill Cafe
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
            {cuisines.map(renderItem)}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
