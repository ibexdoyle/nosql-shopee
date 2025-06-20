package com.example.notification_service.service;

import com.example.notification_service.event.OrderStatusChangedEvent;

public interface NotificationService {
    void handleOrderStatusChange(OrderStatusChangedEvent event);

}
