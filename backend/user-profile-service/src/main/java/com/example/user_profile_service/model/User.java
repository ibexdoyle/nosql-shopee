package com.example.user_profile_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "users")
@Data
//@Getter
//@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private UUID id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String role; // "CUSTOMER", "SELLER", "ADMIN"
    private String userRank; // "BRONZE", "SILVER", "GOLD", etc.

    private UUID shopID;
}
