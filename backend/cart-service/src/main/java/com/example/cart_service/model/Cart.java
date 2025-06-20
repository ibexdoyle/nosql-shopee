package com.example.cart_service.model;

import lombok.*;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {
    private String userId;
    private List<CartItem> items = new ArrayList<>();
}
