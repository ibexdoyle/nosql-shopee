package com.example.notification_service.repository;

import com.example.notification_service.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByUserId(UUID userId);
}
