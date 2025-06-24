package com.example.payment_service.model;


import lombok.*;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.*;
import java.time.Instant;
import java.util.UUID;

@Table("payment_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentLog {

    @PrimaryKeyClass
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Key {
        @PrimaryKeyColumn(name = "transaction_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
        private UUID transactionId;

        @PrimaryKeyColumn(name = "version", ordinal = 1, type = PrimaryKeyType.CLUSTERED)
        private int version;
    }

    @PrimaryKey
    private Key key;

    @Column("message")
    private String message;
    @Column("created_at")
    private Instant createdAt;
}