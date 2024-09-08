import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";

const logo = require("../../assets/logo.png");

export const LandingScreen = ({ navigation }) => {
  const opacity = useSharedValue(0);
  const shake = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 1000 }),
      transform: [
        {
          translateY: withTiming(opacity.value ? 0 : 50, { duration: 1000 }),
        },
      ],
    };
  });

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shake.value,
        },
      ],
    };
  });

  React.useEffect(() => {
    opacity.value = 1;

    const startShaking = () => {
      shake.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 75, easing: Easing.linear }),
          withTiming(10, { duration: 150, easing: Easing.linear }),
          withTiming(-10, { duration: 75, easing: Easing.linear }),
          withTiming(10, { duration: 150, easing: Easing.linear }),
          withTiming(0, { duration: 75, easing: Easing.linear }),
          withDelay(1800, withTiming(0))
        ),
        -1,
        false
      );
    };

    startShaking();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-blue-500 justify-center items-center">
      <View className="w-3/4 items-center">
        <Animated.Image
          source={logo}
          className="w-56 h-56 mb-4"
          style={animatedStyle}
        />
        <Animated.Text
          className="text-white text-3xl font-bold mb-4"
          style={animatedStyle}
        >
          The Urban Cafe
        </Animated.Text>
        <Animated.View style={[animatedStyle, shakeStyle]}>
          <Pressable
            onPress={() => {
              navigation.navigate("Menu");
            }}
            className="bg-white rounded-full py-2 px-6"
          >
            <Text className="text-blue-500 font-semibold">
              Let's Get Started
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
