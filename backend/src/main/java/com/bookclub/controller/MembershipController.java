package com.bookclub.controller;

import com.bookclub.model.Role;
import com.bookclub.model.User;
import com.bookclub.service.AuthService;
import com.bookclub.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class MembershipController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @GetMapping("/api/members")
    public ResponseEntity<?> listMembers(@RequestHeader(name = "Authorization", required = false) String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String token = header.substring(7);
        return authService.findUserByToken(token)
                .map(user -> {
                    boolean isAdmin = user.getUserRoles().stream()
                            .map(userRole -> userRole.getRole())
                            .map(Role::getName)
                            .anyMatch("ADMIN"::equalsIgnoreCase);
                    if (!isAdmin) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                    List<UserSummary> members = userService.findAll().stream()
                            .map(u -> new UserSummary(
                                    u.getId(),
                                    u.getUsername(),
                                    u.getUserRoles().stream().map(userRole -> userRole.getRole()).map(Role::getName).collect(Collectors.toList())
                            ))
                            .collect(Collectors.toList());
                    return ResponseEntity.ok(members);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @Data
    public static class UserSummary {
        private final Long id;
        private final String username;
        private final List<String> roles;
    }
}
