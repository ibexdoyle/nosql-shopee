package com.example.user_profile_service.service;

import com.example.user_profile_service.model.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(UUID id);
    User getUserByUsername(String username);
    User createUser(User user);
    User updateUser(UUID id, User user);
    void deleteUser(UUID id);
    User registerUser(User user);
}
