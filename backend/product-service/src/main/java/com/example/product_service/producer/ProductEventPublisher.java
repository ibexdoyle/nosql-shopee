package com.example.product_service.producer;

import com.example.product_service.event.StockConfirmedEvent;
import com.example.product_service.event.StockFailedEvent;
import com.example.product_service.event.produce.ProductCreatedEvent;
import com.example.product_service.event.produce.ProductDeletedEvent;
import com.example.product_service.event.produce.ProductUpdatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProductEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishStockConfirmed(UUID orderId) {
        log.info("Publishing StockConfirmedEvent for order {}", orderId);
        kafkaTemplate.send("stock-confirmed-topic",
                StockConfirmedEvent.builder()
                        .orderId(orderId)
                        .build());
    }

    public void publishStockFailed(UUID orderId, String reason) {
        log.warn("Publishing StockFailedEvent for order {}: {}", orderId, reason);
        kafkaTemplate.send("stock-failed-topic",
                StockFailedEvent.builder()
                        .orderId(orderId)
                        .reason(reason)
                        .build());
    }


    public void publishProductCreated(ProductCreatedEvent event) {
        log.info("Publishing ProductCreatedEvent for product {}", event.getProductId());
        kafkaTemplate.send("product-created-topic", event);
    }

    public void publishProductUpdated(ProductUpdatedEvent event) {
        log.info("Publishing ProductUpdatedEvent for product {}", event.getProductId());
        kafkaTemplate.send("product-updated-topic", event);
    }

    public void publishProductDeleted(ProductDeletedEvent event) {
        log.info("Publishing ProductDeletedEvent for product {}", event.getProductId());
        kafkaTemplate.send("product-deleted-topic", event);
    }
}
