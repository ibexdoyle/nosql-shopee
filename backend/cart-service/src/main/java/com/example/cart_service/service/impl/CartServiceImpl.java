package com.example.cart_service.service.impl;


import com.example.cart_service.client.ProductClient;
import com.example.cart_service.dto.CartItemResponse;
import com.example.cart_service.dto.CartResponse;
import com.example.cart_service.dto.ProductDTO;
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

    @Autowired
    private ProductClient productClient;

    @Override
    public CartResponse getCartForUser(String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElse(new Cart(null, userId, List.of()));

        List<CartItemResponse> itemResponses = cart.getItems().stream().map(item -> {
            ProductDTO product = productClient.getProductById(item.getProductId());
            return CartItemResponse.builder()
                    .productId(product.getId())
                    .name(product.getName())
                    .images(product.getImages())
                    .salePrice(product.getSalePrice())
                    .quantity(item.getQuantity())
                    .build();
        }).toList();

        return CartResponse.builder()
                .userId(userId)
                .items(itemResponses)
                .build();
    }

    @Override
    public CartResponse addToCart(String userId, CartItem newItem) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElse(new Cart(null, userId, List.of()));

        Optional<CartItem> existingItemOpt = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(newItem.getProductId()))
                .findFirst();

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity() + newItem.getQuantity());
        } else {
            cart.getItems().add(newItem);
        }

        cartRepository.save(cart);
        return getCartForUser(userId);
    }


    @Override
    public CartResponse removeFromCart(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().removeIf(item -> item.getProductId().equals(productId));

        cartRepository.save(cart);
        return getCartForUser(userId);
    }

    @Override
    public void clearCart(String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().clear();
        cartRepository.save(cart);
    }
}