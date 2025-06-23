package com.example.search_service.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.math.BigDecimal;
import java.util.List;

@Document(indexName = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDocument {
    @Id
    private String productId;
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
    private String shopId;
    private List<String> images;
    private String category;
}
