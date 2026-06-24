package com.bookclub.service;

import com.bookclub.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private final UserService userService;
    private final Map<String, Long> tokens = new ConcurrentHashMap<>();

    @Autowired
    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public Optional<String> login(String username, String password) {
        if (userService.validateCredentials(username, password)) {
            String token = UUID.randomUUID().toString();
            userService.findByUsername(username).ifPresent(user -> tokens.put(token, user.getId()));
            return Optional.of(token);
        }
        return Optional.empty();
    }

    public boolean isValidToken(String token) {
        return token != null && tokens.containsKey(token);
    }

    public Optional<User> findUserByToken(String token) {
        return Optional.ofNullable(tokens.get(token)).flatMap(userService::findById);
    }
}
