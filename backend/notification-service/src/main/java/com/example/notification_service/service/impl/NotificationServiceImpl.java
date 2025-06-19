package com.example.notification_service.service.impl;

import com.example.notification_service.event.OrderStatusChangedEvent;
import com.example.notification_service.model.Notification;
import com.example.notification_service.repository.NotificationRepository;
import com.example.notification_service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


import java.time.Instant;


@Service
@RequiredArgsConstructor
@Slf4j

public class NotificationServiceImpl implements NotificationService {


    private final NotificationRepository notificationRepository;
    private final JavaMailSender mailSender;


    @Override
    public void handleOrderStatusChange(OrderStatusChangedEvent event){
        // Gửi mail
        sendMail(event);

        // Lưu vào DB
        Notification notification = Notification.builder()
                .userId(event.getUserId())
                .type("ORDER_STATUS")
                .message(event.getMessage())
                .createdAt(Instant.now())
                .build();
        notificationRepository.save(notification);
    }

    private void sendMail(OrderStatusChangedEvent event) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(event.getUserEmail());
            mail.setSubject("Order Notification - Status " + event.getStatus());
            mail.setText("Your order " + event.getOrderId() + " is " + event.getStatus() + ": " + event.getMessage());
            mailSender.send(mail);
        } catch (Exception e) {
            log.error("Error sending mail", e);
        }
    }

}
