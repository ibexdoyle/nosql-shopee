package com.example.payment_service.listener;

import com.example.payment_service.event.*;
import com.example.payment_service.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class PaymentEventListener {

    private final PaymentService paymentService;

    @KafkaListener(topics = "order-created-topic", groupId = "payment-service")
    public void onOrderCreated(OrderCreatedEvent event) {
        log.info("[Kafkaaaaaaaaaa] Received OrderCreatedEvent for order {}", event.getOrderId());
        paymentService.handleOrderCreated(event);
    }

    @KafkaListener(topics = "wallet-charged-topic", groupId = "payment-service")
    public void onWalletCharged(WalletChargedEvent event) {
        log.info("[Kafka] Wallet charged for order {}", event.getOrderId());
        paymentService.handleWalletCharged(event);
    }

    @KafkaListener(topics = "wallet-failed-topic", groupId = "payment-service")
    public void onWalletFailed(WalletFailedEvent event) {
        log.warn("[Kafka] Wallet failed for order {}: {}", event.getOrderId());
        paymentService.handleWalletFailed(event);
    }

    @KafkaListener(topics = "payment-rollback-topic", groupId = "payment-service")
    public void onPaymentRollback(PaymentRollbackEvent event) {
        log.warn("[Kafka] Received PaymentRollbackEvent for order {}", event.getOrderId());
        paymentService.handlePaymentRollback(event);
    }
}
