# CurrencyFlow Front

CurrencyFlow Front is the React, TypeScript, and Vite frontend for the CurrencyFlow payment request platform.

It consumes the Laravel API from the `CurrencyFlow` backend repository and will provide:

- OAuth 2.0 Authorization Code with PKCE authentication.
- Employee registration.
- Payment request creation and tracking.
- Finance approval and rejection workflows.
- A polished operational interface for repeated business use.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Zod
- lucide-react
- Docker for local development

## Local Development

The frontend development server is configured to run on:

```text
http://localhost:3000
```

The backend API is expected at:

```text
http://localhost:8000
```

The backend seeded OAuth client currently uses:

```text
Redirect URI: http://localhost:3000/auth/callback
```

The frontend should request these OAuth scopes when starting the PKCE flow:

```text
profile:read profile:update payments:read payments:create payments:approve
```

Copy `.env.example` to `.env` when local overrides are needed. `VITE_DEFAULT_LOCALE` accepts `en` or `pt-BR`.

## Docker Development

Start the frontend development environment:

```bash
docker compose up -d --build
```

Open the application:

```text
http://localhost:3000
```

Stop the frontend environment:

```bash
docker compose down
```

The Docker setup mounts the source code into the container and keeps `node_modules` in a Docker volume, so Vite hot reload can run without requiring local Node.js dependencies.

## Quality Checks

Run linting:

```bash
docker compose exec frontend npm run lint
```

Run formatting check:

```bash
docker compose exec frontend npm run format:check
```

Run a production build:

```bash
docker compose exec frontend npm run build
```

## Planned Architecture

The frontend will use a pragmatic Clean Architecture adapted to React:

```text
src/
  app/
  domain/
  application/
  infrastructure/
  presentation/
  shared/
```

High-level rules:

- Presentation code must not call raw HTTP directly.
- Application code orchestrates user flows and use cases.
- Domain code stays framework-light and free from React/browser APIs.
- Infrastructure owns API calls, token storage, environment access, and DTO mapping.

More details:

```text
docs/architecture.md
```
