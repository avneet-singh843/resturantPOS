import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

export const Cuisines = ({ selectedCuisine, setSelectedCuisine }) => {
  const [cuisines, setCuisines] = useState([]);
  const [error, setError] = useState(null);

  const fetchCuisines = async () => {
    try {
      console.log("Fetching cuisines...");
      const response = await fetch("http://192.168.1.34:3000/cuisines");
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Data fetched:", data);
      setCuisines(data);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      setError("Failed to fetch cuisines. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedCuisine === item.name;
    return (
      <TouchableOpacity
        className={`items-center p-3 border ${
          isSelected
            ? "border-blue-500 bg-blue-100 shadow-md"
            : "border-gray-200 bg-white"
        } rounded-lg mx-2`}
        onPress={() => setSelectedCuisine(item.name)}
      >
        <View className="mb-2">
          <Image
            source={{ uri: item.image }}
            className="w-16 h-16 rounded-full"
          />
        </View>
        <Text
          className={`text-center w-20 text-sm ${
            isSelected ? "text-blue-500 font-bold" : "text-gray-800"
          }`}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="my-5">
      <FlatList
        data={cuisines}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  );
};
