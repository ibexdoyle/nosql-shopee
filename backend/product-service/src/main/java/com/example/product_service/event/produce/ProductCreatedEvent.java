package com.example.product_service.event.produce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreatedEvent {
    private String productId;
    private String name;
    private String description;
    private BigDecimal originalPrice;
    private BigDecimal salePrice;
    private BigDecimal sold;
    private int stock;
    private String shopId;
    private List<String> images;
    private String category;
}

