# Express TS Boilerplate

This project is a boilerplate for building Node.js REST APIs using **Express**, **TypeScript**, **Sequelize**, and **Passport** for authentication. It is designed to provide a solid foundation for scalable, maintainable, and secure backend applications.

---

## Features

- **TypeScript** for type safety and maintainability
- **Express** for routing and middleware
- **Sequelize** ORM for PostgreSQL
- **Passport** for authentication (JWT & Local strategies)
- **Express-session** for session management
- **Validation** using `express-validator`
- **Security** via `helmet` and CORS configuration
- **Environment-based configuration**
- **Pre-configured ESLint and Prettier** for code style enforcement

---

## Folder Structure

```
src/
  app.ts             # Main entry point
  apps/              # Application modules (routes, controllers, services)
    app/             # App-wide middlewares and validation
    auth/            # Authentication logic (routes, controllers, middlewares)
    users/           # User management logic
  configs/           # Configuration files (DB, env, passport, session, security)
  libs/              # Utility libraries (errors, server response, constants)
  constants/         # Constant values (e.g., time)
  models/            # Sequelize models (User, Company, Role, etc.)
  services/
    db/              # Database helper functions (CRUD)
  types/             # TypeScript type definitions
.vscode/             # VS Code workspace settings
.env                 # Environment variables
.eslintrc.js         # ESLint configuration
.prettierrc          # Prettier configuration
package.json         # NPM scripts and dependencies
```

---

## Coding Style

- **Linting**: Enforced by ESLint with TypeScript and Prettier plugins.
- **Formatting**: Prettier is used for consistent code formatting.
- **Type Safety**: All code is written in TypeScript with strict type checking.
- **Error Handling**: Centralized error classes and a global error handler middleware.
- **Validation**: Request validation is handled via `express-validator` with rules defined per feature.
- **Environment Variables**: Managed via `.env` files and loaded in the configs.

---

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Configure environment:**

   - Copy `.env.example` to `.env` and fill in your values.

3. **Run in development:**

   ```sh
   npm run dev
   ```

4. **Build for production:**

   ```sh
   npm run build
   ```

5. **Start production server:**
   ```sh
   npm start
   ```

---

## Useful Information

- **Database**: Uses PostgreSQL by default. Configure credentials in `.env`.
- **Session**: Configured with `express-session`. Redis support is scaffolded but commented out.
- **Authentication**: Passport supports both local (email/password) and JWT strategies.
- **API Versioning**: All routes are prefixed with `/api/v1`.
- **Error Responses**: All errors return a consistent JSON structure.

---

## Contributing

- Follow the existing code style.
- Write modular, type-safe code.
- Add/extend types in `src/types/` as needed.

---
