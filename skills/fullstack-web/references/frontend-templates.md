# Frontend Code Templates

## Component (`src/components/UserCard.tsx`)

```tsx
import type { User } from "../@types/user.types";

interface UserCardProps {
  user: User;
  onSelect?: (id: string) => void;
}

export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div className="user-card" onClick={() => onSelect?.(user.id)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

Rules:
- Named export preferred (default export only for pages/routes)
- Props interface defined in the same file unless shared
- No business logic — just rendering + event forwarding

---

## Page (`src/pages/UsersPage.tsx`)

```tsx
import { useUsers } from "../hooks/useUsers";
import { UserCard } from "../components/UserCard";

export default function UsersPage() {
  const { users, isLoading, error } = useUsers();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
}
```

Rules:
- Default export (for lazy-loading / route splitting)
- One page = one route
- Fetch data via hook, not directly

---

## Custom Hook (`src/hooks/useUsers.ts`)

```typescript
import { useState, useEffect } from "react";
import { userApi } from "../api/user.api";
import type { User } from "../@types/user.types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    userApi
      .getAll()
      .then(setUsers)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { users, isLoading, error };
}
```

For mutations, return `{ mutate, isLoading, error }`.

If using React Query, replace the above with:
```typescript
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: userApi.getAll });
}
```

---

## API Client (`src/api/client.ts`)

```typescript
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data.data as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
```

Note: If not using Vite, swap `import.meta.env.VITE_API_URL` with `process.env.REACT_APP_API_URL` (CRA) or the appropriate bundler env syntax.

---

## API Resource (`src/api/user.api.ts`)

```typescript
import { apiClient } from "./client";
import type { User, CreateUserDto, UpdateUserDto } from "../@types/user.types";

export const userApi = {
  getAll: () => apiClient.get<User[]>("/api/users"),
  getById: (id: string) => apiClient.get<User>(`/api/users/${id}`),
  create: (dto: CreateUserDto) => apiClient.post<User>("/api/users", dto),
  update: (id: string, dto: UpdateUserDto) => apiClient.put<User>(`/api/users/${id}`, dto),
  remove: (id: string) => apiClient.delete<void>(`/api/users/${id}`),
};
```

---

## Validator (`src/validators/user.schema.ts`)

```typescript
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
```

Usage with react-hook-form:
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, type CreateUserDto } from "../validators/user.schema";

const form = useForm<CreateUserDto>({ resolver: zodResolver(createUserSchema) });
```

---

## Shared Types (`src/@types/user.types.ts`)

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}
```

---

## Route Definitions (`src/routes/index.tsx`)

With React Router v6:
```tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainTemplate from "../templates/MainTemplate";

const UsersPage = lazy(() => import("../pages/UsersPage"));
const UserDetailPage = lazy(() => import("../pages/UserDetailPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainTemplate />,
    children: [
      { path: "users", element: <Suspense fallback={null}><UsersPage /></Suspense> },
      { path: "users/:id", element: <Suspense fallback={null}><UserDetailPage /></Suspense> },
    ],
  },
]);
```

---

## Template / Layout (`src/templates/MainTemplate.tsx`)

```tsx
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function MainTemplate() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
```

---

## App Root (`src/app.tsx`)

```tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## Utility Function (`src/utils/formatDate.ts`)

```typescript
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(iso));
}
```

Rules:
- Pure functions only (no side effects, no imports from React)
- One file per concern
- Export as named functions

---

## Theme Tokens (`src/themes/variables.css`)

```css
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #0f172a;
  --color-text-muted: #64748b;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```
