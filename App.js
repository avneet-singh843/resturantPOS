import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { MenuScreen } from "./screens/menuScreen/menuScreen";

export default function App() {
  // const [articles, setArticles] = useState([]);
  // const fetchArticles = async () => {
  //   try {
  //     console.log("Fetching articles...");
  //     const response = await fetch("http://192.168.1.34:3000/articles");
  //     console.log("Response status:", response.status);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     console.log("Data fetched");
  //     setArticles(data);
  //   } catch (error) {
  //     console.error("Error fetching articles:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  return (
    <SafeAreaView>
      <Text>App</Text>
      <MenuScreen />
    </SafeAreaView>
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     padding: 20,
    //   }}
    // >
    //   <FlatList
    //     data={articles}
    //     keyExtractor={(item) => item.id.toString()}
    //     renderItem={({ item }) => (
    //       <View style={{ marginBottom: 10 }}>
    //         <Text style={{ fontSize: 18, fontWeight: "bold" }}>
    //           {item.title}
    //         </Text>
    //         <Text>{item.content}</Text>
    //       </View>
    //     )}
    //   />
    // </SafeAreaView>
  );
}
