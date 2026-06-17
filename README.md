# CurrencyFlow Front

CurrencyFlow Front is the React, TypeScript, and Vite frontend for the CurrencyFlow payment request platform.

It consumes the Laravel API from the `CurrencyFlow` backend repository and provides:

- OAuth 2.0 Authorization Code with PKCE authentication.
- Employee registration.
- Payment request creation and tracking.
- Finance approval and rejection workflows.
- English and Portuguese Brazil interface languages.
- A polished operational interface for repeated business use.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- React Hook Form
- Zod
- i18next and react-i18next
- lucide-react
- Docker for local development

## Requirements

Recommended local ports:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8000
```

The backend API must be running before authenticated frontend flows can be used.

The backend OAuth client used by this frontend must be a public Passport client with:

```text
Redirect URI: http://localhost:3000/auth/callback
Allowed origin: http://localhost:3000
```

The frontend requests these OAuth scopes:

```text
profile:read profile:update payments:read payments:create payments:approve
```

## Environment

Copy `.env.example` to `.env` when local overrides are needed:

```bash
cp .env.example .env
```

Expected values:

```text
VITE_API_BASE_URL=http://localhost:8000
VITE_OAUTH_CLIENT_ID=<backend-public-oauth-client-id>
VITE_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
VITE_DEFAULT_LOCALE=en
```

`VITE_DEFAULT_LOCALE` accepts `en` or `pt-BR`.

## Docker Setup

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

## Local Setup

Docker is the preferred development path. If running locally without Docker, install dependencies and start Vite:

```bash
npm install
npm run dev
```

The app will run at:

```text
http://localhost:3000
```

## Backend Setup

From the backend repository, start the Laravel API and supporting services:

```bash
docker compose up -d --build
```

Run the backend setup commands when needed:

```bash
docker compose exec app php artisan migrate --seed
```

Make sure the seeded OAuth public client id matches `VITE_OAUTH_CLIENT_ID` in the frontend `.env`.

If the backend database was recreated, the OAuth client id may also have changed. Update the frontend `.env` and restart the frontend container after changing environment variables:

```bash
docker compose restart frontend
```

## OAuth Login Flow

The frontend uses Authorization Code with PKCE:

1. The user clicks sign in.
2. The frontend generates a PKCE verifier, challenge, and state.
3. The browser redirects to the backend `/oauth/authorize` page.
4. The user logs in and authorizes the requested scopes.
5. The backend redirects to `/auth/callback` on the frontend.
6. The frontend exchanges the authorization code at `/oauth/token`.
7. The frontend stores the access and refresh tokens in `sessionStorage`.
8. The frontend loads the current user from `/api/user` and opens the dashboard.

Tokens are intentionally stored in `sessionStorage`, so a browser session can be refreshed but the data is cleared when the tab session ends or the user signs out.

## Clean Architecture

The frontend uses a pragmatic Clean Architecture adapted to React:

```text
src/
  app/              application bootstrap, providers, router, query client
  domain/           business types, enums, value objects, pure rules
  application/      use cases, schemas, orchestration, workflow contracts
  infrastructure/   HTTP client, OAuth storage, API adapters, environment access
  presentation/     pages, layouts, hooks, route guards, UI composition
  shared/           reusable UI primitives, formatting, utilities
```

Rules:

- Presentation code must not call raw HTTP directly.
- Presentation may call application hooks/use cases and shared UI components.
- Application code coordinates workflows and validation boundaries.
- Domain code stays framework-light and free from React/browser APIs.
- Infrastructure owns API calls, token storage, environment access, and DTO mapping.

More details are available in:

```text
docs/architecture.md
```

## Quality Checks

Run unit and component tests:

```bash
docker compose exec frontend npm run test
```

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

## Demo Script

Use this flow to rehearse the product with the backend running:

1. Open `http://localhost:3000`.
2. Register a new employee account or sign in with a seeded backend user.
3. Confirm the dashboard shows the signed-in user, role, country, and preferred currency.
4. Open `Payment Requests`.
5. Create a new payment request with title, description, amount, and currency.
6. Open the created request and review the exchange-rate snapshot, EUR amount, status, expiration, and event history.
7. Sign in as a finance user.
8. Open `Finance Review`.
9. Approve or reject a pending request with an optional review note.
10. Confirm the request status changes and the review information is visible on the detail page.

## Troubleshooting

### Invalid OAuth Client

If the backend shows `invalid_client`, confirm that:

- `VITE_OAUTH_CLIENT_ID` matches an existing backend public OAuth client.
- The OAuth client is not revoked.
- The OAuth client redirect URI is exactly `http://localhost:3000/auth/callback`.

### CORS Error On `/oauth/token`

If the callback page stays on "Finishing sign in" and the browser network tab shows a CORS error, confirm that the backend OAuth client allowed origin includes:

```text
http://localhost:3000
```

After changing backend OAuth client data, clear old browser sessions and try the login flow again.

### Callback Fails Or State Is Invalid

If `/auth/callback` shows a failed sign-in state:

- Start the login flow again from the frontend sign-in button.
- Do not manually reuse an old authorization URL.
- Confirm browser `sessionStorage` is enabled.

### User Immediately Signs In Again After Logout

The frontend revokes and clears its bearer token on sign out. The backend browser session used by Laravel Passport may still exist. If the backend session is still active, starting OAuth again can skip the login form and go straight to authorization.

To force the backend login screen, clear the backend session cookie for `localhost:8000` or use the backend logout option when available.
