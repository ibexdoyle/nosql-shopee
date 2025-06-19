package com.example.order_service.repository;

import com.example.order_service.model.Order;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends CassandraRepository<Order, Order.Key> {
    List<Order> findByKeyUserId(UUID userId);

    Order findByOrderId(UUID orderId);
}