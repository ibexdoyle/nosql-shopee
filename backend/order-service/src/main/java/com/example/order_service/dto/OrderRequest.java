package com.example.order_service.dto;

import com.example.order_service.model.OrderItem;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    private UUID userId;
    private UUID shopId;
    private BigDecimal total;
    private List<OrderItem> items;
}