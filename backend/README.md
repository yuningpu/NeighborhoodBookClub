# Neighborhood Book Club API

A Spring Boot REST API for managing the Neighborhood Book Club application.

## Technologies

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database** (in-memory for development)
- **Maven** (build tool)
- **Lombok** (code generation)

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/bookclub/
│   │   │   ├── api/           # Main application class
│   │   │   ├── controller/    # REST controllers
│   │   │   ├── model/         # Entity models
│   │   │   └── service/       # Business logic & repositories
│   │   └── resources/         # Configuration files
│   └── test/
│       └── java/com/bookclub/ # Unit tests
├── pom.xml                    # Maven dependencies and build configuration
└── README.md
```

## Building the Project

### Prerequisites

- Java 17 or higher
- Maven 3.6.0 or higher

### Build

```bash
cd backend
mvn clean package
```

## Running the Application

### Option 1: Using Maven

```bash
mvn spring-boot:run
```

### Option 2: Running the JAR

```bash
java -jar target/neighborhood-book-club-api-0.0.1-SNAPSHOT.jar
```

## API Endpoints

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/{id}` | Get a book by ID |
| POST | `/api/books` | Create a new book |
| PUT | `/api/books/{id}` | Update a book |
| DELETE | `/api/books/{id}` | Delete a book |
| GET | `/api/books/health` | Health check |

### Example Request (Create Book)

```bash
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "publishYear": 1925,
    "isbn": "978-0-7432-7356-5"
  }'
```

## Database

The application uses H2 in-memory database for development. To access the H2 console:

```
URL: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:testdb
Username: sa
Password: (leave blank)
```

## CORS Configuration

CORS is enabled for the frontend running on `http://localhost:4200`.

## Swagger / OpenAPI

Once the backend is running, Swagger UI is available at:

```bash
http://localhost:8080/swagger-ui/index.html
```

OpenAPI JSON is available at:

```bash
http://localhost:8080/v3/api-docs
```

## Testing

```bash
mvn test
```

## Development Notes

- The database is created and dropped on each application restart (useful for development)
- Automatic timestamps are added to `createdAt` and `updatedAt` fields
- The API includes cross-origin support for the Angular frontend

## Next Steps

- Add more entity models (User, BookClub, etc.)
- Implement authentication and authorization
- Add database persistence (PostgreSQL, MySQL)
- Implement comprehensive error handling
- Add API documentation (Swagger/OpenAPI)
- Implement unit and integration tests
