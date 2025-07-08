package com.example.cart_service.service;

import com.example.cart_service.dto.CartResponse;
import com.example.cart_service.model.Cart;
import com.example.cart_service.model.CartItem;

public interface CartService {
    CartResponse getCartForUser(String userId);
    CartResponse addToCart(String userId, CartItem item);
    CartResponse removeFromCart(String userId, String productId);
    void clearCart(String userId);
}
