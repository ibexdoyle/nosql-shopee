package com.example.order_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka
//@EnableFeignClients(basePackages = "com.example.orderservice.client")
public class OrderServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(OrderServiceApplication.class, args);
	}

}
