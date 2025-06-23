package com.example.wallet_service.controller;

import com.example.wallet_service.model.Wallet;
import com.example.wallet_service.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/wallets")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @PostMapping("/deposit")
    public ResponseEntity<Void> deposit(@RequestParam UUID userId, @RequestParam BigDecimal amount) {
        walletService.deposit(userId, amount);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Boolean> withdraw(@RequestParam UUID userId, @RequestParam BigDecimal amount) {
        boolean success = walletService.withdraw(userId, amount);
        return ResponseEntity.ok(success);
    }

    @PostMapping("/refund")
    public ResponseEntity<Void> refund(@RequestParam UUID userId, @RequestParam BigDecimal amount) {
        walletService.refund(userId, amount);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/balance")
    public ResponseEntity<BigDecimal> getBalance(@RequestParam UUID userId) {
        return ResponseEntity.ok(walletService.getBalance(userId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Wallet> getWalletByUserId(@PathVariable UUID userId) {
        Wallet wallet = walletService.findByUserId(userId);
        if (wallet != null) {
            return ResponseEntity.ok(wallet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create new wallet
    @PostMapping
    public ResponseEntity<Wallet> createWallet(@RequestBody Wallet wallet) {
        Wallet createdWallet = walletService.createWallet(wallet);
        return ResponseEntity.ok(createdWallet);
    }

    // Delete wallet
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteWallet(@PathVariable UUID userId) {
        walletService.deleteWallet(userId);
        return ResponseEntity.noContent().build();
    }



}