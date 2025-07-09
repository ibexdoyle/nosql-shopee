package com.example.cart_service.service.impl;

import com.example.cart_service.client.ProductClient;
import com.example.cart_service.client.UserClient;
import com.example.cart_service.dto.CartItemResponse;
import com.example.cart_service.dto.CartResponse;
import com.example.cart_service.dto.ProductDTO;
import com.example.cart_service.dto.User;
import com.example.cart_service.model.Cart;
import com.example.cart_service.model.CartItem;
import com.example.cart_service.repository.CartRepository;
import com.example.cart_service.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductClient productClient;

    @Autowired
    private UserClient userClient;

    /**
     * Lấy giỏ hàng cho user đang đăng nhập
     */
    @Override
    public CartResponse getCartForCurrentUser(String cookie) {
        System.out.println("Cookie from frontend: " + cookie);
        User user = userClient.getCurrentUser(cookie);
        UUID userId = user.getId();

        Cart cart = cartRepository.findByUserId(userId.toString())
                .orElseGet(() -> createNewCart(userId.toString()));

        List<CartItemResponse> itemResponses = cart.getItems().stream()
                .map(item -> {
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
                .userId(userId.toString())
                .items(itemResponses)
                .build();
    }

    @Override
    public CartResponse addToCart(CartItem newItem, String cookie) {
        User user = userClient.getCurrentUser(cookie);
        UUID userId = user.getId();

        Cart cart = cartRepository.findByUserId(userId.toString())
                .orElseGet(() -> createNewCart(userId.toString()));

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
        return getCartForCurrentUser(cookie);
    }

    @Override
    public CartResponse removeFromCart(String productId, String cookie) {
        User user = userClient.getCurrentUser(cookie);
        UUID userId = user.getId();

        Cart cart = cartRepository.findByUserId(userId.toString())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        cartRepository.save(cart);

        return getCartForCurrentUser(cookie);
    }

    /**
     * Xoá toàn bộ giỏ hàng
     */
    @Override
    public void clearCart(String cookie) {
        User user = userClient.getCurrentUser(cookie);
        UUID userId = user.getId();

        Cart cart = cartRepository.findByUserId(userId.toString())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().clear();
        cartRepository.save(cart);
    }

    /**
     * Helper: Tạo mới giỏ hàng
     */
    private Cart createNewCart(String userId) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setItems(new ArrayList<>());
        return cartRepository.save(cart);
    }
}
