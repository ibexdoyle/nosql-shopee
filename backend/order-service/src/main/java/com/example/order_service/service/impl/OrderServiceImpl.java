package com.example.order_service.service.impl;

import com.example.order_service.dto.OrderRequest;
import com.example.order_service.enums.OrderStatus;
import com.example.order_service.event.OrderCreatedEvent;
import com.example.order_service.event.PaymentRollbackEvent;
import com.example.order_service.event.ProductRollbackEvent;
import com.example.order_service.model.Order;
import com.example.order_service.model.OrderItem;
import com.example.order_service.producer.OrderProducer;
import com.example.order_service.producer.RollbackProducer;
import com.example.order_service.repository.OrderRepository;
import com.example.order_service.service.OrderService;
import com.example.order_service.util.OrderItemDeserializer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderProducer orderProducer;
    private final RollbackProducer rollbackProducer;

    private final Map<UUID, Boolean> stockStatus = new ConcurrentHashMap<>();
    private final Map<UUID, Boolean> paymentStatus = new ConcurrentHashMap<>();

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Order createOrder(OrderRequest request) {
        UUID orderId = UUID.randomUUID();
        Instant createdAt = Instant.now();


        List<String> itemStrings = request.getItems().stream()
                .map(item->{
                    try{
                        return objectMapper.writeValueAsString(item);
                    }
                    catch(JsonProcessingException e){
                        throw new RuntimeException("Cannot serialize OrderItem", e);
                    }
                })
                .collect(Collectors.toList());


        Order order = Order.builder()
                .key(new Order.Key(request.getUserId(), createdAt))
                .orderId(orderId)
                .shopId(request.getShopId())
                .status(OrderStatus.PENDING.name())
                .total(request.getTotal())
                .items(itemStrings)
                .build();

        orderRepository.save(order);

        OrderCreatedEvent event = OrderCreatedEvent.builder()
                .orderId(orderId)
                .userId(request.getUserId())
                .shopId(request.getShopId())
                .total(request.getTotal())
                .items(request.getItems())
                .build();

        orderProducer.publishOrderCreated(event);
        return order;
    }

    @Override
    public void handleEvent(UUID orderId, String eventType) {
        switch (eventType) {
            case "STOCK_CONFIRMED" -> stockStatus.put(orderId, true);
            case "STOCK_FAILED" -> stockStatus.put(orderId, false);
            case "PAYMENT_CONFIRMED" -> paymentStatus.put(orderId, true);
            case "PAYMENT_FAILED" -> paymentStatus.put(orderId, false);
        }

        if (stockStatus.containsKey(orderId) && paymentStatus.containsKey(orderId)) {
            boolean stockOk = stockStatus.get(orderId);
            boolean paymentOk = paymentStatus.get(orderId);

            Order order = orderRepository.findByOrderId(orderId);
            if (order == null) {
                log.warn("Order {} not found for processing", orderId);
                return;
            }

            if (stockOk && paymentOk) {
                finalizeOrder(orderId, OrderStatus.SUCCESS.name());
            } else if (stockOk) {
                rollbackProduct(order);
                finalizeOrder(orderId, OrderStatus.FAILED.name() + " - PAYMENT_FAILED");
            } else if (paymentOk) {
                rollbackPayment(order);
                finalizeOrder(orderId, OrderStatus.FAILED.name() + " - STOCK_FAILED");
            } else {
                finalizeOrder(orderId, OrderStatus.FAILED.name() + " - STOCK_AND_PAYMENT_FAILED");
            }

            stockStatus.remove(orderId);
            paymentStatus.remove(orderId);
        }
    }

    public void finalizeOrder(UUID orderId, String status) {
        Order order = orderRepository.findByOrderId(orderId);
        if (order != null) {
            order.setStatus(status);
            orderRepository.save(order);
            log.info("Order {} updated to status {}", orderId, status);
        } else {
            log.warn("Order {} not found for finalization", orderId);
        }
    }

    private void rollbackProduct(Order order) {
//        List<String> itemJsonList = order.getItems().stream()
//                        .map(item ->{
//                            try{
//                                return objectMapper.writeValueAsString(item);
//                            } catch(Exception e){
//                                throw new RuntimeException("Failed to serialize OrderItem", e);
//                            }
//                        })
//                                .collect(Collectors.toList());
//

        rollbackProducer.sendRollbackToProduct(ProductRollbackEvent.builder()
                .orderId(order.getOrderId())
                .items(OrderItemDeserializer.deserializeItems(order.getItems()))
//                .reason("Payment failed after stock confirmed")
                .build());
    }

    private void rollbackPayment(Order order) {
        rollbackProducer.sendRollbackToPayment(PaymentRollbackEvent.builder()
                .orderId(order.getOrderId())
                .userId(order.getKey().getUserId())
                .total(order.getTotal())
//                .reason("Stock failed after payment success")
                .build());
    }

    @Override
    public void updateOrderStatus(UUID orderId, String status) {
        finalizeOrder(orderId, status);
    }

    @Override
    public List<Order> getOrdersByUser(UUID userId) {
        return orderRepository.findByKeyUserId(userId);
    }
}
