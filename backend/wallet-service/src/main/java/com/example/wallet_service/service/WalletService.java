package com.example.wallet_service.service;

import com.example.wallet_service.model.Wallet;

import java.math.BigDecimal;
import java.util.UUID;

public interface WalletService {
    void deposit(UUID userId, BigDecimal amount);
    boolean withdraw(UUID userId, BigDecimal amount);
    void refund(UUID userId, BigDecimal amount);
    BigDecimal getBalance(UUID userId);
    Wallet findByUserId(UUID userId);
    Wallet createWallet(Wallet wallet);
    void deleteWallet(UUID userId);
}