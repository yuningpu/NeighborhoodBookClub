package com.bookclub.controller;

import com.bookclub.service.AuthService;
import com.bookclub.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return authService.login(request.getUsername(), request.getPassword())
                .map(token -> ResponseEntity.ok(new AuthResponse(token, request.getUsername())))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AuthRequest request) {
        if (userService.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Username already exists"));
        }
        userService.createUser(request.getUsername(), request.getPassword());
        return authService.login(request.getUsername(), request.getPassword())
                .map(token -> ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token, request.getUsername())))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @Data
    public static class AuthRequest {
        private String username;
        private String password;
    }

    @Data
    public static class AuthResponse {
        private final String token;
        private final String username;
    }

    @Data
    public static class ErrorResponse {
        private final String message;
    }
}
