package com.example.wallet_service.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.UUID;

@Document(collection = "wallets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wallet {
    @Id
    private UUID id;
    private UUID ownerId;
    private String ownerType; // CUSTOMER or SHOP
    private BigDecimal balance;
}