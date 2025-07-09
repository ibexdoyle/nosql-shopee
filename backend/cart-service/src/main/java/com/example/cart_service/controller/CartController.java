package com.example.cart_service.controller;

import com.example.cart_service.dto.CartRequest;
import com.example.cart_service.dto.CartResponse;
import com.example.cart_service.model.CartItem;
import com.example.cart_service.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(HttpServletRequest request) {
        String cookie = request.getHeader("Cookie");
        if (cookie == null) return ResponseEntity.status(401).build();

        try {
            CartResponse cart = cartService.getCartForCurrentUser(cookie);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(@RequestBody CartItem item, HttpServletRequest request) {
        String cookie = request.getHeader("Cookie");
        if (cookie == null) return ResponseEntity.status(401).build();

        try {
            CartResponse updatedCart = cartService.addToCart(item, cookie);
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<CartResponse> removeFromCart(@PathVariable String productId, HttpServletRequest request) {
        String cookie = request.getHeader("Cookie");
        if (cookie == null) return ResponseEntity.status(401).build();

        try {
            CartResponse updatedCart = cartService.removeFromCart(productId, cookie);
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(HttpServletRequest request) {
        String cookie = request.getHeader("Cookie");
        if (cookie == null) return ResponseEntity.status(401).build();

        try {
            cartService.clearCart(cookie);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}

