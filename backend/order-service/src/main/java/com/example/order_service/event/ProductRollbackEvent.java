package com.example.order_service.event;

import com.example.order_service.model.OrderItem;
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
public class ProductRollbackEvent {
    private UUID orderId;
    private List<OrderItem> items;
}
