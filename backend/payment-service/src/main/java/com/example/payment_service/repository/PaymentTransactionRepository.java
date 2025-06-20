package com.example.payment_service.repository;

import com.example.payment_service.model.PaymentTransaction;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.UUID;

public interface PaymentTransactionRepository extends CassandraRepository<PaymentTransaction, UUID> {
    PaymentTransaction findByOrderId(UUID orderId);
}