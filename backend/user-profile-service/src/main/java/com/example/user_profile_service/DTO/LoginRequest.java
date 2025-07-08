package com.example.user_profile_service.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
