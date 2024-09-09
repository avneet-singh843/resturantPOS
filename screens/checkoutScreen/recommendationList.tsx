import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, FlatList } from "react-native";
import { API_BASE_URL } from "@env";
const apiBaseUrl = API_BASE_URL;
export const RecommendationList = ({ cartItems, setCartItems }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/recommendations`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      setError("Failed to fetch recommendations. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedCartItems = [...prevItems];
      if (updatedCartItems.length === 0) {
        updatedCartItems.push({});
      }

      if (updatedCartItems[0][item.name]) {
        updatedCartItems[0][item.name].quantity += 1;
      } else {
        updatedCartItems[0][item.name] = { ...item, quantity: 1 };
      }

      console.log("Updated cart items:", updatedCartItems);
      return updatedCartItems;
    });
  };

  const renderItem = ({ item }) => (
    <View className="bg-white px-4 pb-3 rounded-lg shadow-sm m-2 items-center">
      <Image
        source={{ uri: item.image }}
        className="h-28 w-28 rounded-lg "
        resizeMode="cover"
      />
      <View className="items-center ">
        <Text className="text-lg font-bold mb-1">{item.name}</Text>
        <Text className="text-sm text-gray-900">${item.price}</Text>
      </View>
      <Pressable
        className="mt-2 p-2 bg-blue-500 rounded-lg items-center justify-center "
        onPress={() => handleAddToCart(item)}
      >
        <Text className="text-white text-sm">Add to Cart</Text>
      </Pressable>
    </View>
  );

  return (
    <View className="px-2">
      <Text className="text-lg font-bold mb-2">You Might Have Missed</Text>
      {error ? (
        <Text className="text-red-500 text-center">{error}</Text>
      ) : (
        <FlatList
          data={recommendations}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};
