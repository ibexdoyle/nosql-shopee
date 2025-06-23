package com.example.cart_service.service.impl;


import com.example.cart_service.model.Cart;
import com.example.cart_service.model.CartItem;
import com.example.cart_service.repository.CartRepository;
import com.example.cart_service.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart getCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElse(Cart.builder().userId(userId).items(new ArrayList<>()).build());
    }

    @Override
    public Cart addItem(String userId, String productId, int quantity) {
        Cart cart = getCart(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        cart.getItems().add(new CartItem(productId, quantity));
        return cartRepository.save(cart);
    }

    @Override
    public Cart removeItem(String userId, String productId) {
        Cart cart = getCart(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }

    @Override
    public void clearCart(String userId) {
        cartRepository.deleteByUserId(userId);
    }
}