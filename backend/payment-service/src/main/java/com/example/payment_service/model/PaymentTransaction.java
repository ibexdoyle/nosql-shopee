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
    @Column("transaction_id")
    private UUID transactionId;

    @Column("order_id")
    private UUID orderId;

    @Column("user_id")
    private UUID userId;

    @Column("amount")
    private BigDecimal amount;

    @Column("status")
    private String status;

    @Column("payment_method")
    private String paymentMethod;

    
    @Column("created_at")
    private Instant createdAt;
}
