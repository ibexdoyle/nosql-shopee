package com.example.payment_service.service.impl;

import com.example.payment_service.event.*;
import com.example.payment_service.model.PaymentLog;
import com.example.payment_service.model.PaymentTransaction;
import com.example.payment_service.producer.PaymentEventPublisher;
import com.example.payment_service.repository.PaymentLogRepository;
import com.example.payment_service.repository.PaymentTransactionRepository;
import com.example.payment_service.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private final PaymentTransactionRepository transactionRepo;
    private final PaymentLogRepository logRepo;
    private final PaymentEventPublisher publisher;

    @Override
    public List<PaymentLog> getTransactionLogs(UUID transactionId) {
        return logRepo.findByKeyTransactionId(transactionId);
    }

    @Override
    public void handleOrderCreated(OrderCreatedEvent event) {
        log.info("Processing payment for order {}", event.getOrderId());

        PaymentTransaction tx = PaymentTransaction.builder()
                .transactionId(UUID.randomUUID())
                .orderId(event.getOrderId())
                .userId(event.getUserId())
                .amount(event.getTotal())
                .paymentMethod("WALLET")
                .status("PENDING")
                .createdAt(Instant.now())
                .build();

        transactionRepo.save(tx);

        BalanceCheckEvent balanceEvent = BalanceCheckEvent.builder()
                .orderId(event.getOrderId())
                .userId(event.getUserId())
                .amount(event.getTotal())
                .build();

        publisher.sendBalanceCheck(balanceEvent);
        logRepo.save(log(tx.getTransactionId(), "Initiated balance check"));
    }

    @Override
    public void handleWalletCharged(WalletChargedEvent event) {
        PaymentTransaction tx = transactionRepo.findByOrderId(event.getOrderId());
        if (tx == null) {
            log.warn("Payment transaction not found for order {}", event.getOrderId());
            return;
        }

        tx.setStatus("SUCCESS");
        transactionRepo.save(tx);
        logRepo.save(log(tx.getTransactionId(), "Wallet charged successfully"));

        publisher.publishConfirmed(tx.getOrderId());
    }

    @Override
    public void handleWalletFailed(WalletFailedEvent event) {
        PaymentTransaction tx = transactionRepo.findByOrderId(event.getOrderId());
        if (tx == null) {
            log.warn("Payment transaction not found for order {}", event.getOrderId());
            return;
        }

        tx.setStatus("FAILED");
        transactionRepo.save(tx);
        logRepo.save(log(tx.getTransactionId(), "Wallet failed: "));

        publisher.publishFailed(tx.getOrderId());
    }

    @Override
    public void handlePaymentRollback(PaymentRollbackEvent event) {
        log.warn("Handling rollback for order {}", event.getOrderId());

        WalletRefundEvent refund = WalletRefundEvent.builder()
                .orderId(event.getOrderId())
                .userId(event.getUserId())
                .amount(event.getTotal())
                .build();

        publisher.sendWalletRefund(refund);
    }

    public PaymentLog log(UUID txId, String message) {
        return PaymentLog.builder()
                .key(new PaymentLog.Key(txId, (int) (Math.random() * 10000)))
                .message(message)
                .createdAt(Instant.now())
                .build();
    }
}
