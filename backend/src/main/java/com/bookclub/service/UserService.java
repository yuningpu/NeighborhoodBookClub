package com.bookclub.service;

import com.bookclub.model.Role;
import com.bookclub.model.User;
import com.bookclub.model.UserRole;
import com.bookclub.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public java.util.List<User> findAll() {
        return userRepository.findAll();
    }

    public User createUser(String username, String rawPassword) {
        return createUser(username, rawPassword, "MEMBER");
    }

    public User createUser(String username, String rawPassword, String roleName) {
        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        user.setPassword(rawPassword);
        Role role = findOrCreateRole(roleName == null ? "MEMBER" : roleName);
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        user.getUserRoles().add(userRole);
        return userRepository.save(user);
    }

    public Optional<Role> findRoleByName(String name) {
        return roleRepository.findByName(name);
    }

    public Role findOrCreateRole(String name) {
        return roleRepository.findByName(name)
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName(name);
                    return roleRepository.save(role);
                });
    }

    public boolean validateCredentials(String username, String rawPassword) {
        return userRepository.findByUsername(username)
                .map(user -> passwordEncoder.matches(rawPassword, user.getPasswordHash()))
                .orElse(false);
    }
}
