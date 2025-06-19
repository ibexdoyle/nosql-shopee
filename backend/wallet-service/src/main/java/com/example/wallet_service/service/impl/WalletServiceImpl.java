package com.example.wallet_service.service.impl;

import com.example.wallet_service.model.Wallet;
import com.example.wallet_service.repository.WalletRepository;
import com.example.wallet_service.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;

    @Override
    public void deposit(UUID ownerId, BigDecimal amount) {
        Wallet wallet = walletRepository.findByOwnerId(ownerId)
                .orElse(Wallet.builder().id(UUID.randomUUID()).ownerId(ownerId).balance(BigDecimal.ZERO).build());
        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);
    }

    @Override
    public boolean withdraw(UUID ownerId, BigDecimal amount) {
        Wallet wallet = walletRepository.findByOwnerId(ownerId).orElse(null);
        if (wallet == null || wallet.getBalance().compareTo(amount) < 0) {
            return false;
        }
        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);
        return true;
    }

    @Override
    public void refund(UUID ownerId, BigDecimal amount) {
        deposit(ownerId, amount);
    }

    @Override
    public BigDecimal getBalance(UUID ownerId) {
        return walletRepository.findByOwnerId(ownerId)
                .map(Wallet::getBalance)
                .orElse(BigDecimal.ZERO);
    }
}

