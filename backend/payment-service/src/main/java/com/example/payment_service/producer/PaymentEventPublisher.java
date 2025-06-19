package com.example.payment_service.producer;

import com.example.payment_service.event.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class PaymentEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    // Gửi yêu cầu kiểm tra số dư đến WalletService
    public void sendBalanceCheck(BalanceCheckEvent event) {
        log.info("Publishing BalanceCheckEvent for order {}", event.getOrderId());
        kafkaTemplate.send("balance-check-topic", event);
    }

    // Gửi sự kiện thanh toán thành công đến OrderService
    public void publishConfirmed(java.util.UUID orderId) {
        log.info("Publishing PaymentConfirmedEvent for order {}", orderId);
        kafkaTemplate.send("payment-confirmed-topic",
                PaymentConfirmedEvent.builder()
                        .orderId(orderId)
                        .build()
        );
    }

    // Gửi sự kiện thanh toán thất bại đến OrderService
    public void publishFailed(UUID orderId) {
        log.warn("Publishing PaymentFailedEvent for order {}", orderId);
        kafkaTemplate.send("payment-failed-topic",
                PaymentFailedEvent.builder()
                        .orderId(orderId)
                        .build()
        );
    }

    // Gửi yêu cầu hoàn tiền đến WalletService khi rollback
    public void sendWalletRefund(WalletRefundEvent walletRefundEvent) {
        log.warn("Publishing WalletRefundEvent for rollback of order {}", walletRefundEvent.getOrderId());
        kafkaTemplate.send("wallet-refund-topic",walletRefundEvent);
    }
}
