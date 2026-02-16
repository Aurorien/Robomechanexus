# Backend API - Refactored Architecture

An Express.js backend application following modern Node.js best practices with layered architecture.

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration modules
│   │   ├── database.js      # Database connection and pool
│   │   └── environment.js   # Environment variables
│   ├── controllers/     # Request/response handlers
│   │   └── chip.controller.js
│   ├── services/        # Business logic layer
│   │   └── chip.service.js
│   ├── data/            # Data access layer
│   │   ├── chip.data.js
│   │   └── itemType.data.js
│   ├── routes/          # Route definitions
│   │   ├── chip.routes.js
│   │   └── index.js
│   ├── middleware/      # Custom middleware
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── validator.js
│   ├── utils/           # Utility functions
│   │   └── errors.js
│   └── app.js           # Express app configuration
├── index.js             # Application entry point
├── package.json
└── .env                 # Environment variables (not in git)
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PGURI=postgresql://username:password@host:port/database
PORT=3000
NODE_ENV=development
```

See `.env.example` for a template.

## API Endpoints

- `GET /api/chips` - Get all chips
- `POST /api/chips` - Create a new chip with item type
- `DELETE /api/chips/:id` - Delete a chip by ID

### Request/Response Examples

**GET /api/chips**
```json
[
  {
    "chip_id": 1,
    "chip_name": "Memory Chip",
    "chip_use": "Storage",
    "item_type_name": "Electronics"
  }
]
```

**POST /api/chips**
Request:
```json
{
  "name": "Memory Chip",
  "use": "Storage",
  "type": "Electronics"
}
```
Response (201):
```json
{
  "message": "Chip created successfully",
  "chip": {
    "chip_id": 1,
    "chip_name": "Memory Chip",
    "chip_use": "Storage",
    "chip_item_type_id": 1
  }
}
```

**DELETE /api/chips/1**
Response (200):
```json
{
  "message": "Chip with ID 1 successfully deleted"
}
```

### Error Responses

All errors follow a consistent format:
```json
{
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "type": "ValidationError"
  }
}
```

Status codes:
- `400` - Validation error (missing/invalid fields)
- `404` - Resource not found
- `500` - Server/database error

## Middleware Execution Order

1. `express.json()` - Parse JSON request bodies
2. `requestLogger` - Log incoming requests
3. Route-specific validation middleware
4. Route handlers (controllers)
5. `errorHandler` - Catch and format errors

## Architecture Layers

### Configuration Layer
- Manages environment variables and database connection
- Validates required configuration on startup

### Data Layer (Data Access)
- Encapsulates all database queries
- Uses parameterized queries to prevent SQL injection
- Wraps database errors in custom error classes

### Services (Business Logic Layer)
- Contains business logic and transaction management
- Coordinates between controllers and data layer
- Handles multi-step operations with transactions

### Controllers (Request/Response Layer)
- Handles HTTP request/response logic
- Delegates business logic to services
- Returns appropriate status codes and response formats

### Routes
- Defines API endpoints
- Maps URLs to controller functions
- Applies validation middleware

### Middleware
- **Validator**: Validates request data before processing
- **Logger**: Logs all incoming requests and responses
- **Error Handler**: Catches and formats all errors consistently

## Running the Application

```bash
# Install dependencies
npm install

# Start the server
node index.js
```

The server will start on the port specified in your `.env` file (default: 3000).
