package com.example.cart_service.service;

import com.example.cart_service.model.Cart;

public interface CartService {
    Cart getCart(String userId);
    Cart addItem(String userId, String productId, int quantity);
    Cart removeItem(String userId, String productId);
    void clearCart(String userId);
}
