import { Text, StyleSheet, View } from "react-native";
import { Cuisines } from "./cuisines";

export const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Big Chill Cafe</Text>
      <Cuisines />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
