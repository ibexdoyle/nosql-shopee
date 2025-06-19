package com.example.order_service.service;

import com.example.order_service.dto.OrderRequest;
import com.example.order_service.model.Order;
import com.example.order_service.model.OrderItem;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    Order createOrder(OrderRequest request);
    void updateOrderStatus(UUID orderId, String status);

    void handleEvent(UUID orderId, String eventType);

    List<Order> getOrdersByUser(UUID userId);
    void finalizeOrder(UUID orderId, String status);
}