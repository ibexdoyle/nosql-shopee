package com.example.wallet_service.service;

import java.math.BigDecimal;
import java.util.UUID;

public interface WalletService {
    void deposit(UUID ownerId, BigDecimal amount);
    boolean withdraw(UUID ownerId, BigDecimal amount);
    void refund(UUID ownerId, BigDecimal amount);
    BigDecimal getBalance(UUID ownerId);
}