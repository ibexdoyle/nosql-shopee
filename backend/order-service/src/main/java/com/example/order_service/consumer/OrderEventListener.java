package com.example.order_service.consumer;

import com.example.order_service.event.PaymentConfirmedEvent;
import com.example.order_service.event.PaymentFailedEvent;
import com.example.order_service.event.StockConfirmedEvent;
import com.example.order_service.event.StockFailedEvent;
import com.example.order_service.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventListener {

    private final OrderService orderService;

    @KafkaListener(topics = "stock-confirmed-topic", groupId = "order-service")
    public void onStockConfirmed(StockConfirmedEvent event) {
        orderService.handleEvent(event.getOrderId(), "STOCK_CONFIRMED");
    }

    @KafkaListener(topics = "stock-failed-topic", groupId = "order-service")
    public void onStockFailed(StockFailedEvent event) {
        orderService.handleEvent(event.getOrderId(), "STOCK_FAILED");
    }

    @KafkaListener(topics = "payment-confirmed-topic", groupId = "order-service")
    public void onPaymentConfirmed(PaymentConfirmedEvent event) {
        orderService.handleEvent(event.getOrderId(), "PAYMENT_CONFIRMED");
    }

    @KafkaListener(topics = "payment-failed-topic", groupId = "order-service")
    public void onPaymentFailed(PaymentFailedEvent event) {
        orderService.handleEvent(event.getOrderId(), "PAYMENT_FAILED");
    }
}

