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
    public void deposit(UUID userId, BigDecimal amount) {
        Wallet wallet = walletRepository.findByUserId(userId)
                .orElse(Wallet.builder().id(UUID.randomUUID()).userId(userId).balance(BigDecimal.ZERO).build());
        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);
    }

    @Override
    public boolean withdraw(UUID userId, BigDecimal amount) {
        Wallet wallet = walletRepository.findByUserId(userId).orElse(null);
        if (wallet == null || wallet.getBalance().compareTo(amount) < 0) {
            return false;
        }
        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);
        return true;
    }

    @Override
    public void refund(UUID userId, BigDecimal amount) {
        deposit(userId, amount);
    }

    @Override
    public BigDecimal getBalance(UUID userId) {
        return walletRepository.findByUserId(userId)
                .map(Wallet::getBalance)
                .orElse(BigDecimal.ZERO);
    }


    @Override
    public Wallet findByUserId(UUID userId) {
        return walletRepository.findByUserId(userId).orElse(null);
    }

    @Override
    public Wallet createWallet(Wallet wallet) {
        wallet.setId(UUID.randomUUID());
        if (wallet.getBalance() == null) {
            wallet.setBalance(BigDecimal.ZERO);
        }
        return walletRepository.save(wallet);
    }

    @Override
    public void deleteWallet(UUID userId) {
        walletRepository.findByUserId(userId)
                .ifPresent(walletRepository::delete);
    }
}

