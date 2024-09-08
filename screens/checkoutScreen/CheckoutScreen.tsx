import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons from Expo

export const CheckoutScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchCuisines = async () => {
    try {
      const response = await fetch("http://192.168.1.34:3000/cartItems");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const lastCartItem = data[data.length - 1];
      setCartItems(lastCartItem ? [lastCartItem] : []);
    } catch (error) {
      setError("Failed to fetch cuisines. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, []);

  const incrementQuantity = (key) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems[0] };
      updatedItems[key].quantity += 1;
      return [updatedItems];
    });
  };

  const decrementQuantity = (key) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems[0] };
      if (updatedItems[key].quantity > 1) {
        updatedItems[key].quantity -= 1;
      }
      return [updatedItems];
    });
  };

  if (error) {
    return (
      <SafeAreaView style={styles.centeredView}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  const calculateTotal = () => {
    return cartItems.length > 0
      ? Object.keys(cartItems[0]).reduce((total, key) => {
          if (key !== "id") {
            const item = cartItems[0][key];
            return total + item.price * item.quantity;
          }
          return total;
        }, 0)
      : 0;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerText}>Cart</Text>
        <Pressable onPress={clearCart}>
          <Ionicons name="trash-outline" size={24} color="#333" />
        </Pressable>
      </View>

      {/* Cart Items */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cartItems.length > 0 ? (
          Object.keys(cartItems[0]).map((key) => {
            if (key !== "id") {
              const item = cartItems[0][key];
              return (
                <View key={key} style={styles.itemContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemBrand}>{item.brand}</Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemType}>{item.selectedCuisine}</Text>
                    <View style={styles.itemFooter}>
                      <Text style={styles.itemPrice}>
                        ${item.price * item.quantity}
                      </Text>
                      <View style={styles.quantityControl}>
                        <TouchableOpacity
                          onPress={() => incrementQuantity(key)}
                        >
                          <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color="#007bff"
                          />
                        </TouchableOpacity>
                        <Text style={styles.itemQuantity}>{item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => decrementQuantity(key)}
                        >
                          <Ionicons
                            name="remove-circle-outline"
                            size={24}
                            color="#007bff"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }
          })
        ) : (
          <Text style={styles.emptyCartText}>No items in cart</Text>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalPriceText}>
          Total: ${calculateTotal().toFixed(2)}
        </Text>
        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>
            Check Out (
            {cartItems.length > 0 ? Object.keys(cartItems[0]).length - 1 : 0})
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  itemBrand: {
    fontSize: 14,
    color: "#666",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemType: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 16,
    color: "#000",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemQuantity: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#007bff", // Primary blue color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  emptyCartText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  billSummary: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  billSummaryText: {
    fontSize: 16,
    color: "#333",
  },
});
