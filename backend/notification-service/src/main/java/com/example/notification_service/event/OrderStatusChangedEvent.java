package com.example.notification_service.event;

import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderStatusChangedEvent {
    private UUID orderId;
    private UUID userId;
    private String status; // SUCCESS or FAILED
    private String message;
    private String userEmail;
}
