package com.example.product_service.event;

import com.example.product_service.model.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockConfirmedEvent {
    private UUID orderId;
    private List<OrderItem> items;
}
