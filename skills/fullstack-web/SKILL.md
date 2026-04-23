---
name: fullstack-web
description: >
  Fullstack web project structure skill for React (any bundler) + Node/Express + TypeScript + Prisma.
  Use this skill whenever the user asks to scaffold, create files, add features, or generate code
  for a fullstack web project — even if they just say "tạo component", "thêm API", "tạo service",
  "viết controller", "tạo model", or "setup project". Also trigger when user shares a file tree
  resembling frontend/backend separation with src/ containing components, pages, hooks (frontend)
  or controllers, services, middlewares, routes (backend). This skill defines the canonical folder
  structure, naming conventions, layering rules, and code templates to follow consistently.
---

# Fullstack Web Project Skill

Stack: **React (any bundler) + Node/Express + TypeScript + Prisma ORM**

---

## 1. Project Layout

```
root/
├── frontend/               # React app
│   ├── src/
│   │   ├── @types/         # Global TS types/interfaces
│   │   ├── api/            # API client functions (fetch wrappers)
│   │   ├── assets/         # Images, fonts, static files
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page-level components (1 per route)
│   │   ├── routes/         # Route definitions & guards
│   │   ├── templates/      # Layout wrappers (with header/footer)
│   │   ├── themes/         # CSS variables, theme tokens
│   │   ├── utils/          # Pure helper functions
│   │   ├── validators/     # Schema validation (Zod preferred)
│   │   ├── app.tsx         # Root component, providers
│   │   └── main.tsx        # Entry point
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.ts  # (if using Tailwind)
│
└── backend/                # Express API
    ├── prisma/
    │   └── schema.prisma
    ├── src/
    │   ├── @types/         # Express augmentation, global types
    │   ├── config/         # App config, env parsing, constants
    │   ├── controllers/    # Request handlers (thin, no business logic)
    │   ├── helpers/        # Internal utility functions
    │   ├── middlewares/    # Express middlewares (auth, error, logging)
    │   ├── models/         # Prisma client wrappers / DB abstractions
    │   ├── routes/         # Route registration
    │   ├── services/       # Business logic layer
    │   ├── validators/     # Request validation schemas (Zod)
    │   └── server.ts       # Express app bootstrap + listen
    ├── .env
    ├── .gitignore
    ├── biome.json
    └── package.json
```

---

## 2. Naming Conventions

| Context | Convention | Example |
|---|---|---|
| Folders | `kebab-case` | `user-profile/` |
| React components | `PascalCase.tsx` | `UserCard.tsx` |
| Hooks | `use` prefix, camelCase | `useAuthUser.ts` |
| API functions | camelCase | `fetchUserById.ts` |
| Service files | camelCase + `.service.ts` | `user.service.ts` |
| Controller files | camelCase + `.controller.ts` | `user.controller.ts` |
| Route files | camelCase + `.routes.ts` | `user.routes.ts` |
| Validator files | camelCase + `.schema.ts` | `user.schema.ts` |
| Middleware files | camelCase + `.middleware.ts` | `auth.middleware.ts` |
| Model files | camelCase + `.model.ts` | `user.model.ts` |
| Type/interface files | camelCase + `.types.ts` | `user.types.ts` |

---

## 3. Layer Rules (Backend)

```
Request → Route → Middleware → Controller → Service → Model → DB
```

- **Routes**: only map HTTP method + path → controller function
- **Controllers**: parse req, call service, send res. No DB calls, no logic.
- **Services**: all business logic. Calls models. Throws typed errors.
- **Models**: Prisma queries only. Returns raw data.
- **Middlewares**: auth check, error handling, request logging, rate limit.
- **Validators**: Zod schemas, used in middleware before controller runs.

**Rule**: never skip a layer. Controller must not call Prisma directly.

---

## 4. Code Templates

See reference files for copy-paste templates:
- `references/backend-templates.md` — controller, service, model, route, middleware
- `references/frontend-templates.md` — component, hook, api function, page, validator

Read the relevant reference file before generating code.

---

## 5. TypeScript Rules

- All functions have explicit return types
- Use `interface` for object shapes, `type` for unions/aliases
- Put shared types in `@types/` (e.g., `user.types.ts`)
- Backend: augment Express `Request` in `src/@types/express.d.ts`
- No `any`. Use `unknown` and narrow with guards.

---

## 6. Environment Variables

Frontend `.env`:
```
VITE_API_URL=http://localhost:3000   # or REACT_APP_ prefix if CRA
```

Backend `.env`:
```
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=...
NODE_ENV=development
```

Parse and export from `src/config/env.ts` — never import `process.env` directly in services.

---

## 7. Error Handling Pattern (Backend)

- Define `AppError` class in `src/helpers/AppError.ts`
- Services throw `AppError` with status code + message
- Global error middleware catches and formats response
- Never expose stack traces in production

---

## 8. API Response Format

All responses follow:
```json
{
  "success": true,
  "data": { ... },
  "message": "optional"
}
```
Errors:
```json
{
  "success": false,
  "error": "message",
  "code": "ERROR_CODE"
}
```

---

## 9. Frontend API Layer (`src/api/`)

- One file per resource: `user.api.ts`, `product.api.ts`
- Create an `apiClient` base instance (axios or fetch wrapper) in `api/client.ts`
- Handle token injection and error normalization in the client, not in components
- Never call `fetch`/`axios` directly inside components or hooks

---

## 10. Quick Decision Guide

| Task | Where it goes |
|---|---|
| UI element used in 2+ places | `components/` |
| Full screen (tied to a URL) | `pages/` |
| Data fetching logic | `hooks/` + `api/` |
| Date formatting, string utils | `utils/` |
| Zod form schema | `validators/` |
| Express route definition | `routes/` |
| DB query | `models/` |
| Business rule / calculation | `services/` |
| Auth token check | `middlewares/` |
| Env var access | `config/env.ts` |
