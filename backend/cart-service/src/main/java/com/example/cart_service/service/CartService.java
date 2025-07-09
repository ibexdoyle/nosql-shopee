package com.example.cart_service.service;

import com.example.cart_service.dto.CartResponse;
import com.example.cart_service.model.Cart;
import com.example.cart_service.model.CartItem;
import jakarta.servlet.http.HttpServletRequest;

public interface CartService {
    CartResponse getCartForCurrentUser(String cookie);
    CartResponse addToCart(CartItem item, String cookie);
    CartResponse removeFromCart(String productId, String cookie);
    void clearCart(String cookie);
}
