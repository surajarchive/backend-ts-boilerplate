
# Backend Blueprint

>A robust, scalable, and modern Express.js backend starter with TypeScript, error handling, environment validation, and standardized API responses.

## Features

- **Standardized API Responses**: Consistent success and error response format via `ApiResponse`.
- **Centralized Error Handling**: Custom `AppError` class and global error middleware.
- **Async Error Handling**: Utility to catch async errors in controllers.
- **Environment Validation**: Uses Zod to validate environment variables at startup.
- **Logging**: HTTP request logging with Morgan.
- **Health Check Endpoint**: `/health` route for uptime monitoring.

## Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
# Add other environment variables as needed
```

### 3. Run the Server

```bash
bun run index.ts
```

The server will start at `http://localhost:3000` (or your specified port).

## Example Usage

### Health Check

```http
GET /health

Response: healthy
```

### Standard API Response

```ts
import { ApiResponse } from './config/ApiResonce';

// Success
res.json(ApiResponse.success(200, { user: 'john' }, 'User fetched successfully'));

// Error
res.status(404).json(ApiResponse.error(404, 'User not found', 'RESOURCE_NOT_FOUND'));
```

### Error Handling Example

```ts
import { AppError } from './config/AppError';

throw new AppError('Unauthorized', 401, 'AUTH_ERROR');
```

## Folder Structure

- `index.ts` - Entry point
- `config/` - Core configs (API response, errors, env)
- `middleware/` - Error handling middleware

## Extending

- Add routes/controllers in new folders as needed
- Integrate validation, security, and documentation as your app grows

---

This project was created using `bun init` in bun v1.3.3. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
