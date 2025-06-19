package com.example.notification_service.listener;

import com.example.notification_service.event.OrderStatusChangedEvent;
import com.example.notification_service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventListener {

    private final NotificationService notificationService;

    @KafkaListener(topics = "order-status-topic", groupId = "notification-service")
    public void listenOrderStatus(OrderStatusChangedEvent event) {
        log.info("Received order status update: {}", event);
        notificationService.handleOrderStatusChange(event);
    }
}
