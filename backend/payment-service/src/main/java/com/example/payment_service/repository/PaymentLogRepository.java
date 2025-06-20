package com.example.payment_service.repository;

import com.example.payment_service.model.PaymentLog;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.List;
import java.util.UUID;

public interface PaymentLogRepository extends CassandraRepository<PaymentLog, PaymentLog.Key> {
    List<PaymentLog> findByKeyTransactionId(UUID transactionId);
}
