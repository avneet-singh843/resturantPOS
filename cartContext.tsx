import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  selectedCuisine: string;
  [key: string]: any;
}

interface CartContextType {
  cartItems: { [key: string]: CartItem };
  addToCart: (
    item: Omit<CartItem, "quantity">,
    selectedCuisine: string
  ) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: CartItem }>({});

  const addToCart = (
    item: Omit<CartItem, "quantity">,
    selectedCuisine: string
  ) => {
    setCartItems((prevItems) => {
      const currentQty = prevItems[item.name]?.quantity || 0;
      return {
        ...prevItems,
        [item.name]: {
          ...item,
          quantity: currentQty + 1,
          selectedCuisine,
        },
      };
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const currentQty = prevItems[item.name]?.quantity || 0;
      if (currentQty <= 1) {
        const { [item.name]: _, ...rest } = prevItems;
        return rest;
      }
      return {
        ...prevItems,
        [item.name]: {
          ...item,
          quantity: currentQty - 1,
        },
      };
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
