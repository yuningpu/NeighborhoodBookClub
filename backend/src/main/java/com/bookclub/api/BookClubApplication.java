package com.bookclub.api;

import com.bookclub.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.bookclub")
@EnableJpaRepositories(basePackages = "com.bookclub")
@EntityScan(basePackages = "com.bookclub.model")
public class BookClubApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookClubApplication.class, args);
    }

    @Bean
    public CommandLineRunner seedUsers(UserService userService) {
        return args -> {
            userService.findByUsername("admin")
                .or(() -> userService.findByUsername("user"))
                .orElseGet(() -> userService.createUser("admin", "password", "ADMIN"));
            // create a test member for development
            userService.findByUsername("testmember")
                .orElseGet(() -> userService.createUser("testmember", "password", "MEMBER"));
        };
    }
}
