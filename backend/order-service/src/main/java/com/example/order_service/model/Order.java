package com.example.order_service.model;

import lombok.*;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Table("orders_by_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @PrimaryKeyClass
    public static class Key {
        @PrimaryKeyColumn(name = "user_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
        private UUID userId;

        @PrimaryKeyColumn(name = "created_at", ordinal = 1, type = PrimaryKeyType.CLUSTERED)
        private Instant createdAt;


    }

    @PrimaryKey
    private Key key;

    @Column("order_id")
    private UUID orderId;

    @Column("shop_id")
    private UUID shopId;

    @Column("status")
    private String status;

    @Column("total")
    private BigDecimal total;

    @Column("items")
    private List<String> items; // product item
}