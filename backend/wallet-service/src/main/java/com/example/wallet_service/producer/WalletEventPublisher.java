package com.example.wallet_service.producer;

import com.example.wallet_service.event.WalletChargedEvent;
import com.example.wallet_service.event.WalletFailedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class WalletEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishWalletCharged(UUID orderId) {
        log.info("Publishing WalletChargedEvent for order {}", orderId);
        kafkaTemplate.send("wallet-charged-topic",
                WalletChargedEvent.builder().orderId(orderId).build());
    }

    public void publishWalletFailed(UUID orderId, String reason) {
        log.warn("Publishing WalletFailedEvent for order {} - reason: {}", orderId, reason);
        kafkaTemplate.send("wallet-failed-topic",
                WalletFailedEvent.builder()
                        .orderId(orderId)
                        .build());
    }
}