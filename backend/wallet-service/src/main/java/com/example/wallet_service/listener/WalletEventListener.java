package com.example.wallet_service.listener;

import com.example.wallet_service.event.BalanceCheckEvent;
import com.example.wallet_service.event.WalletRefundEvent;
import com.example.wallet_service.model.Wallet;
import com.example.wallet_service.producer.WalletEventPublisher;
import com.example.wallet_service.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class WalletEventListener {

    private final WalletRepository walletRepository;
    private final WalletEventPublisher publisher;

    @KafkaListener(topics = "balance-check-topic", groupId = "wallet-service")
    public void onBalanceCheck(BalanceCheckEvent event) {
        log.info("Received BalanceCheckEvent for user {}", event.getUserId());

        Optional<Wallet> walletOptional = walletRepository.findByUserId(event.getUserId());

        if (walletOptional.isPresent() && walletOptional.get().getBalance().compareTo(event.getAmount()) >= 0) {
            Wallet wallet = walletOptional.get();
            // Trừ tiền
            wallet.setBalance(wallet.getBalance().subtract(event.getAmount()));
            walletRepository.save(wallet);

            publisher.publishWalletCharged(event.getOrderId());
        } else {
            publisher.publishWalletFailed(event.getOrderId(), "Insufficient balance");
        }
    }


    @KafkaListener(topics = "wallet-refund-topic", groupId = "wallet-service")
    public void onWalletRefund(WalletRefundEvent event) {
        log.warn("Received WalletRefundEvent for order {}, user {}", event.getOrderId(), event.getUserId());

        Optional<Wallet> walletOptional = walletRepository.findByUserId(event.getUserId());

        if (walletOptional.isPresent() ) {
            Wallet wallet = walletOptional.get();
            wallet.setBalance(wallet.getBalance().add(event.getAmount()));
            walletRepository.save(wallet);
            log.info("Refunded {} to user {}", event.getAmount(), event.getUserId());
        } else {
            log.error("Wallet not found for user {}", event.getUserId());
        }
    }
}