package com.bookclub.api;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Neighborhood Book Club API",
                version = "v1",
                description = "REST API for managing books in the Neighborhood Book Club",
                contact = @Contact(name = "Book Club Team", email = "support@bookclub.local"),
                license = @License(name = "Apache 2.0", url = "http://springdoc.org")
        )
)
public class OpenApiConfig {
}
