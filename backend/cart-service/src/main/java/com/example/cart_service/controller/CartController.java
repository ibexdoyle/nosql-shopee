package com.example.cart_service.controller;

import com.example.cart_service.dto.CartRequest;
import com.example.cart_service.dto.CartResponse;
import com.example.cart_service.model.Cart;
import com.example.cart_service.model.CartItem;
import com.example.cart_service.service.CartService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(HttpSession session) {
        String userId = (String) session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(cartService.getCartForUser(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(@RequestBody CartItem item, HttpSession session) {
        String userId = (String) session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(cartService.addToCart(userId, item));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<CartResponse> removeFromCart(@PathVariable String productId, HttpSession session) {
        String userId = (String) session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(cartService.removeFromCart(userId, productId));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(HttpSession session) {
        String userId = (String) session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
