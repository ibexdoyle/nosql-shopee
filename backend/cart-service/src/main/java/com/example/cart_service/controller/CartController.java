package com.example.cart_service.controller;

import com.example.cart_service.model.Cart;
import com.example.cart_service.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable String userId) {
        return cartService.getCart(userId);
    }

    @PostMapping("/{userId}/add")
    public Cart addItem(@PathVariable String userId, @RequestParam String productId, @RequestParam int quantity) {
        return cartService.addItem(userId, productId, quantity);
    }

    @DeleteMapping("/{userId}/remove")
    public Cart removeItem(@PathVariable String userId, @RequestParam String productId) {
        return cartService.removeItem(userId, productId);
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
