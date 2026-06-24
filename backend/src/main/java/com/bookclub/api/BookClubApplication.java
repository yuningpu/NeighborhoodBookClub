package com.bookclub.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.bookclub")
@EnableJpaRepositories(basePackages = "com.bookclub.service")
@EntityScan(basePackages = "com.bookclub.model")
public class BookClubApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookClubApplication.class, args);
    }

}
