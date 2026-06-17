# Frontend Architecture

CurrencyFlow Front uses a pragmatic Clean Architecture adapted to React.

## Layers

- `src/domain`: business types, enums, value objects, and pure rules.
- `src/application`: use cases and orchestration for user workflows.
- `src/infrastructure`: API clients, OAuth storage, environment access, and DTO mapping.
- `src/presentation`: pages, components, layouts, hooks, and UI state.
- `src/app`: application bootstrap, providers, router, and query client.
- `src/shared`: cross-cutting UI primitives and utilities.

## Dependency Rules

- Presentation code can call application code, but must not call raw HTTP directly.
- Application code coordinates workflows and depends on contracts when a boundary is useful.
- Domain code must stay framework-light and free from React or browser APIs.
- Infrastructure owns `fetch`, token storage, environment variables, and external DTO mapping.
- Shared code must stay generic and avoid feature-specific business decisions.

## Feature Direction

Features should be grouped when implementation starts:

- `auth` for OAuth PKCE, session storage, current user, and logout.
- `referenceData` for countries and currencies.
- `paymentRequests` for creation, listing, detail, approval, and rejection.

This keeps React UI code close to user workflows while preserving clear boundaries for API and business behavior.
