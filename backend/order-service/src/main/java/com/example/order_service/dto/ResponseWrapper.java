package com.example.order_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseWrapper {
    private boolean success;
    private String message;
}