package com.example.cart_service.service.impl;


import com.example.cart_service.model.Cart;
import com.example.cart_service.model.CartItem;
import com.example.cart_service.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartServiceImpl implements CartService {

    private static final String KEY_PREFIX = "cart:";

    @Autowired
    private RedisTemplate<String, Cart> redisTemplate;

    @Override
    public Cart getCart(String userId) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(KEY_PREFIX + userId))
                .orElse(Cart.builder().userId(userId).items(new ArrayList<>()).build());
    }

    @Override
    public Cart addItem(String userId, String productId, int quantity) {
        Cart cart = getCart(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        cart.getItems().add(new CartItem(productId, quantity));
        redisTemplate.opsForValue().set(KEY_PREFIX + userId, cart);
        return cart;
    }

    @Override
    public Cart removeItem(String userId, String productId) {
        Cart cart = getCart(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        redisTemplate.opsForValue().set(KEY_PREFIX + userId, cart);
        return cart;
    }

    @Override
    public void clearCart(String userId) {
        redisTemplate.delete(KEY_PREFIX + userId);
    }
}