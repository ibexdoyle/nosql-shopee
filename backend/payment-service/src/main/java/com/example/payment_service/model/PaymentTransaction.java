package com.example.payment_service.model;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Table("payment_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentTransaction {
    @PrimaryKey
    private UUID transactionId;
    private UUID orderId;
    private UUID userId;
    private BigDecimal amount;
    private String status;
    private String paymentMethod;
    private Instant createdAt;
}
