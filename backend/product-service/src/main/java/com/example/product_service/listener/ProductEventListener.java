package com.example.product_service.listener;


import com.example.product_service.event.OrderCreatedEvent;
import com.example.product_service.event.ProductRollbackEvent;
import com.example.product_service.model.Product;
import com.example.product_service.producer.ProductEventPublisher;
import com.example.product_service.repository.ProductRepository;
import com.example.product_service.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProductEventListener {
    private final ProductService productService;
    private final ProductEventPublisher publisher;
    private final ProductRepository productRepository;

    @KafkaListener(topics= "order-created-topic", groupId = "product-service")
    public void handleOrderCreated(OrderCreatedEvent event){
        log.info("Processing stock for order{}", event.getOrderId());

        boolean allAvailable = event.getItems().stream().allMatch(item->{
            Product product = productRepository.findById(item.getProductId()).orElse(null);
            return product != null && product.getStock() >= item.getQuantity();
        });

        if(!allAvailable){
            publisher.publishStockFailed(event.getOrderId(), "Insufficient stock");
            return;
        }

        event.getItems().forEach(item->{
            Product product = productRepository.findById(item.getProductId()).orElse(null);
            if(product!= null){
                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product);
            }
        });
        publisher.publishStockConfirmed(event.getOrderId());

    }

    @KafkaListener(topics = "product-rollback-topic", groupId = "product-service")
    public void handleProductRollback(ProductRollbackEvent event){
        log.warn("Rollback stock for order{}", event.getOrderId());

        event.getItems().forEach(item->{
            Product product = productRepository.findById(item.getProductId()).orElse(null);
            if(product != null){
                product.setStock(product.getStock()+item.getQuantity());
            }
        });

        log.info("Rollback PRODUCT completed for order{}", event.getOrderId());
    }
}
