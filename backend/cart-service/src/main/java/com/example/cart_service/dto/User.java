package com.example.cart_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
//@Getter
//@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private UUID id;
    private String username;
    private String password;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String role; // "CUSTOMER", "SELLER", "ADMIN"
    private String userRank; // "BRONZE", "SILVER", "GOLD", etc.
    private UUID shopID;
}

