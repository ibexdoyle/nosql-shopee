package com.example.wallet_service.repository;

import com.example.wallet_service.model.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.UUID;

public interface WalletRepository extends MongoRepository<Wallet, UUID> {
    Optional<Wallet> findByUserId(UUID userId);

}