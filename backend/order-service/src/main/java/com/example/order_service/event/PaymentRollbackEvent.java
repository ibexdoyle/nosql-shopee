package com.example.order_service.event;

import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRollbackEvent {
    private UUID orderId;
    private UUID userId;
    private BigDecimal total;
}
