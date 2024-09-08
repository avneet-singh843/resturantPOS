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
  const scale = useSharedValue(1); // Added scale shared value for logo animation

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

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
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

    const startScaling = () => {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.05, {
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    };

    startShaking();
    startScaling();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-blue-500 justify-between items-center">
      <View
        className="w-3/4 items-center justify-center"
        style={{ marginTop: "50%" }}
      >
        <Animated.Image
          source={logo}
          className="w-72 h-72" // Increased size
          style={[animatedStyle, scaleStyle]} // Applied scale animation
        />
      </View>
      <Animated.View
        style={[
          animatedStyle,
          shakeStyle,
          { marginBottom: "13%", width: "80%" },
        ]}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Menu");
          }}
          className="bg-white rounded-lg py-2 px-6 items-center"
        >
          <Text className="text-blue-500 font-bold text-xl">
            Let's Get Started
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};
