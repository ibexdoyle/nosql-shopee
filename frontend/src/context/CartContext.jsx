import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCart, addToCart, removeFromCart, clearCart } from "../services/CartService";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const cart = await fetchCart();
        setCartItems(cart.items || []);
      } catch (err) {
        console.error("Không thể tải giỏ hàng:", err.message);
      }
    })();
  }, []);

  const addItem = async (productId, quantity) => {
    const updatedCart = await addToCart(productId, quantity);
    setCartItems(updatedCart.items);
  };

  const removeItem = async (productId) => {
    const updatedCart = await removeFromCart(productId);
    setCartItems(updatedCart.items);
  };

  const clearAll = async () => {
    await clearCart();
    setCartItems([]);
  };

  const updateQuantity = async (productId, delta) => {
    const item = cartItems.find((p) => p.productId === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      await removeItem(productId);
    } else {
      await addItem(productId, delta); 
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity, clearAll }}>
      {children}
    </CartContext.Provider>
  );
};
