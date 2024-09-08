import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuScreen } from "./screens/menuScreen/menuScreen";
import { LandingScreen } from "./screens/landingScreen/landingScreen";
import { StyleSheet } from "react-native";
import { CheckoutScreen } from "./screens/checkoutScreen/CheckoutScreen";
import { OrderPlaced } from "./screens/OrderPlaced/orderPlaced";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
