import React from "react";
import { View, Text } from "react-native";

const Header = () => {
  return (
    <View
      className="bg-white p-4 mb-2"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <Text className="text-blue-500 text-4xl font-bold text-center">
        The Urban Cafe
      </Text>
    </View>
  );
};

export default Header;
