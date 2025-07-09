package com.example.cart_service.client;

import com.example.cart_service.dto.User;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-profile-service", url = "http://localhost:8082/api/users")
public interface UserClient {

    @GetMapping("/me")
    User getCurrentUser(@RequestHeader("Cookie") String cookie);
}
