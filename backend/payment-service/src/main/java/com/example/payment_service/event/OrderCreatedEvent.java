package com.example.payment_service.event;

import com.example.payment_service.config.CustomUUIDDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderCreatedEvent {

    private UUID orderId;
    private UUID userId;
    private UUID shopId;
    private BigDecimal total;
    private List<OrderItem> items;

    @Data
    public static class OrderItem {
        @JsonDeserialize(using = CustomUUIDDeserializer.class)
        private UUID productId;
        private int quantity;
    }
}
