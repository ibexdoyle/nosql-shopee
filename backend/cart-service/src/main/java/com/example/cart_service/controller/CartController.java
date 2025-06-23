package com.example.cart_service.controller;

import com.example.cart_service.dto.CartRequest;
import com.example.cart_service.model.Cart;
import com.example.cart_service.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable String userId) {
        return cartService.getCart(userId);
    }

    @PostMapping("/add")
    public Cart addItem(@RequestBody CartRequest request) {
        return cartService.addItem(request.getUserId(), request.getProductId(), request.getQuantity());
    }

    @DeleteMapping("/remove")
    public Cart removeItem(@RequestBody CartRequest request) {
        return cartService.removeItem(request.getUserId(), request.getProductId());
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestBody CartRequest request) {
        cartService.clearCart(request.getUserId());
        return ResponseEntity.noContent().build();
    }
}
