# Express TypeScript Starter

A starter template for building Express.js applications with TypeScript.

## Features

- TypeScript support
- ESLint and Prettier for code quality
- Authentication module with controller, service, validation
- Error handling and validation middlewares
- Response utilities
- Password hashing with bcryptjs
- CORS support
- Environment configuration with dotenv
- Request logging with Morgan
- Schema validation with Zod

## Installation

1. Clone the repository.
2. Install dependencies: `pnpm install`

## Scripts

- `pnpm build`: Compile TypeScript code
- `pnpm start`: Run the built application
- `pnpm dev`: Run in development mode with nodemon
- `pnpm lint`: Check code style with ESLint
- `pnpm lint:fix`: Fix code style issues with ESLint
- `pnpm format`: Format code with Prettier
- `pnpm format:check`: Check code formatting with Prettier

## Project Structure

```
src/
├── index.ts              # Application entry point
├── server.ts             # Server configuration
├── features/
│   └── auth/             # Authentication module
│       ├── auth.controller.ts
│       ├── auth.route.ts
│       ├── auth.service.ts
│       └── auth.validation.ts
├── middlewares/
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── routes/
│   └── index.ts
└── utils/
    └── response.ts
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- `PORT`: Server port (default: 8080)
- Other environment-specific variables

## Check app is running or not

```
http://localhost:8080/api/v1
```
