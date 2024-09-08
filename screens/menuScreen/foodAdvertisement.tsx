import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";

const advertisementBackground = require("../../assets/foodAdvertisement.jpg");
const foodOffer = require("../../assets/foodOffer.png");

export const FoodAdvertisement = () => {
  return (
    <View className="px-3">
      <View className="w-full h-44 rounded-lg overflow-hidden">
        <ImageBackground
          source={advertisementBackground}
          className="w-full h-full flex-row justify-around items-center"
        >
          <View className="items-center justify-center">
            <Text className="text-4xl font-bold text-white">50% OFF</Text>
            <Text className="text-xl font-bold text-white mt-1">
              ON FIRST ORDER
            </Text>
          </View>
          <View>
            <Image source={foodOffer} className="w-36 h-36" />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
