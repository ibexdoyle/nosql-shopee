package com.example.payment_service.service;

import com.example.payment_service.event.OrderCreatedEvent;
import com.example.payment_service.event.PaymentRollbackEvent;
import com.example.payment_service.event.WalletChargedEvent;
import com.example.payment_service.event.WalletFailedEvent;
import com.example.payment_service.model.PaymentLog;
import com.example.payment_service.model.PaymentTransaction;

import java.util.List;
import java.util.UUID;

public interface PaymentService {
//    PaymentTransaction processPayment(PaymentTransaction tx);
    List<PaymentLog> getTransactionLogs(UUID transactionId);
    void handleOrderCreated(OrderCreatedEvent event);
    void handleWalletCharged(WalletChargedEvent event);
    void handleWalletFailed(WalletFailedEvent event);
    void handlePaymentRollback(PaymentRollbackEvent event);
    PaymentLog log(UUID txId, String message);


}
