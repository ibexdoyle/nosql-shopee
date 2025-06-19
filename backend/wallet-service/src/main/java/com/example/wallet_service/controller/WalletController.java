package com.example.wallet_service.controller;

import com.example.wallet_service.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @PostMapping("/deposit")
    public ResponseEntity<Void> deposit(@RequestParam UUID ownerId, @RequestParam BigDecimal amount) {
        walletService.deposit(ownerId, amount);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Boolean> withdraw(@RequestParam UUID ownerId, @RequestParam BigDecimal amount) {
        boolean success = walletService.withdraw(ownerId, amount);
        return ResponseEntity.ok(success);
    }

    @PostMapping("/refund")
    public ResponseEntity<Void> refund(@RequestParam UUID ownerId, @RequestParam BigDecimal amount) {
        walletService.refund(ownerId, amount);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/balance")
    public ResponseEntity<BigDecimal> getBalance(@RequestParam UUID ownerId) {
        return ResponseEntity.ok(walletService.getBalance(ownerId));
    }
}