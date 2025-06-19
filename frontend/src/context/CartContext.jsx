import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);

  const storageKey = user ? `cart_${user.id}` : "guest_cart";

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCartItems(JSON.parse(saved));
    } else {
      setCartItems([]);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey]);

    const addToCart = (product, quantity) => {
    setCartItems((prev) => {
        const exists = prev.find((item) => item.id === product.id);
        if (exists) {
        return prev.map((item) =>
            item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        } else {
        return [...prev, { ...product, quantity }];
        }
    });
    };

    const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
        prev.map((item) =>
        item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
    };

    const removeFromCart = (productId) => {
      setCartItems((prev) => prev.filter(item => item.id !== productId));
    };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
