package com.example.order_service.producer;


import com.example.order_service.event.OrderStatusChangedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderStatusChangedProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishOrderStatusChanged(OrderStatusChangedEvent event) {
        log.info("Publishing OrderStatusChangedEvent: {}", event);
        kafkaTemplate.send("order-status-topic", event);
    }
}