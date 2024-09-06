import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

export const Cuisines = () => {
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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cuisineName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuisine</Text>
      <FlatList
        data={cuisines}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular image
    marginBottom: 5,
  },
  cuisineName: {
    fontSize: 16,
    textAlign: "center",
  },
});
