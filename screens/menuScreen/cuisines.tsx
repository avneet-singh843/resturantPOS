import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export const Cuisines = () => {
  const [cuisines, setCuisines] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

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
        style={styles.item}
        onPress={() => setSelectedCuisine(item.name)}
      >
        <View
          style={[
            styles.imageContainer,
            isSelected
              ? styles.selectedImageContainer
              : styles.normalImageContainer,
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <Text
          style={[
            styles.text,
            isSelected ? styles.selectedText : styles.normalText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cuisines}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 0,
  },
  item: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  normalImageContainer: {
    backgroundColor: "#e5e7eb", // gray-200
  },
  selectedImageContainer: {
    backgroundColor: "#3b82f6", // blue-500
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  text: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    width: 64,
  },
  normalText: {
    color: "#4b5563", // gray-600
  },
  selectedText: {
    color: "#3b82f6", // blue-500
    fontWeight: "bold",
  },
});
