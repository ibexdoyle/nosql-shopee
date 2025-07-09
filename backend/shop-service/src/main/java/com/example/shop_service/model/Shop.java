package com.example.shop_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "shops")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shop {
    @Id
    private UUID id;

    private UUID userId;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String taxCode;

}