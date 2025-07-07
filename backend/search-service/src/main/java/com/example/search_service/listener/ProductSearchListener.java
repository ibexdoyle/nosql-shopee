package com.example.search_service.listener;

import com.example.search_service.event.produce.ProductCreatedEvent;
import com.example.search_service.event.produce.ProductDeletedEvent;
import com.example.search_service.event.produce.ProductUpdatedEvent;
import com.example.search_service.model.ProductDocument;
import com.example.search_service.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProductSearchListener {

    private final SearchService searchService;

    @KafkaListener(topics = "product-created-topic", groupId = "search-service")
    public void onProductCreated(ProductCreatedEvent event) {
        log.info("Indexing new product: {}", event.getProductId());
        searchService.index(ProductDocument.builder()
                .productId(event.getProductId())
                .name(event.getName())
                .description(event.getDescription())
                .originalPrice(event.getOriginalPrice())
                .salePrice(event.getSalePrice())
                .sold(event.getSold())
                .shopId(event.getShopId())
                .stock(event.getStock())
                .build());
    }

    @KafkaListener(topics = "product-updated-topic", groupId = "search-service")
    public void onProductUpdated(ProductUpdatedEvent event) {
        log.info("Updating product index: {}", event.getProductId());
        searchService.index(ProductDocument.builder()
                .productId(event.getProductId())
                .name(event.getName())
                .description(event.getDescription())
                .originalPrice(event.getOriginalPrice())
                .salePrice(event.getSalePrice())
                .sold(event.getSold())
                .shopId(event.getShopId())
                .stock(event.getStock())
                .build());
    }

    @KafkaListener(topics = "product-deleted-topic", groupId = "search-service")
    public void onProductDeleted(ProductDeletedEvent event) {
        log.warn("Deleting product index: {}", event.getProductId());
        searchService.delete(event.getProductId());
    }
}

