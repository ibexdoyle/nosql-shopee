package com.example.order_service.producer;

import com.example.order_service.event.ProductRollbackEvent;
import com.example.order_service.event.PaymentRollbackEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RollbackProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendRollbackToProduct(ProductRollbackEvent event) {
        kafkaTemplate.send("product-rollback-topic", event);
    }

    public void sendRollbackToPayment(PaymentRollbackEvent event) {
        kafkaTemplate.send("payment-rollback-topic", event);
    }
}

