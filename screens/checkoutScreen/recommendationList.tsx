import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, FlatList } from "react-native";
import { useCart } from "../../cartContext";

const apiBaseUrl = "http://192.168.1.34:3000";

interface RecommendationItem {
  name: string;
  price: number;
  image: string;
  selectedCuisine: string;
}

export const RecommendationList: React.FC = () => {
  const { addToCart } = useCart();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/recommendations`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: RecommendationItem[] = await response.json();
      setRecommendations(data);
    } catch (error) {
      setError("Failed to fetch recommendations. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleAddToCart = (item: RecommendationItem) => {
    addToCart(item, item.selectedCuisine);
  };

  const renderItem = ({ item }: { item: RecommendationItem }) => (
    <View className="bg-white px-4 pb-3 rounded-lg shadow-sm m-2 items-center">
      <Image
        source={{ uri: item.image }}
        className="h-28 w-28 rounded-lg"
        resizeMode="cover"
      />
      <View className="items-center">
        <Text className="text-lg font-bold mb-1">{item.name}</Text>
        <Text className="text-sm text-gray-900">${item.price}</Text>
      </View>
      <Pressable
        className="mt-2 p-2 bg-blue-500 rounded-lg items-center justify-center"
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
