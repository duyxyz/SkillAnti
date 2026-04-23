# Backend Code Templates

## Controller (`src/controllers/user.controller.ts`)

```typescript
import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";

export const userController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await userService.findAll();
      res.json({ success: true, data: users });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.findById(req.params.id);
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.create(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.update(req.params.id, req.body);
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await userService.remove(req.params.id);
      res.json({ success: true, message: "Deleted" });
    } catch (err) {
      next(err);
    }
  },
};
```

---

## Service (`src/services/user.service.ts`)

```typescript
import { userModel } from "../models/user.model";
import { AppError } from "../helpers/AppError";
import type { CreateUserDto, UpdateUserDto } from "../@types/user.types";

export const userService = {
  async findAll() {
    return userModel.findMany();
  },

  async findById(id: string) {
    const user = await userModel.findById(id);
    if (!user) throw new AppError("User not found", 404);
    return user;
  },

  async create(dto: CreateUserDto) {
    const existing = await userModel.findByEmail(dto.email);
    if (existing) throw new AppError("Email already in use", 409);
    return userModel.create(dto);
  },

  async update(id: string, dto: UpdateUserDto) {
    await userService.findById(id); // throws if not found
    return userModel.update(id, dto);
  },

  async remove(id: string) {
    await userService.findById(id);
    return userModel.delete(id);
  },
};
```

---

## Model (`src/models/user.model.ts`)

```typescript
import { prisma } from "../config/prisma";
import type { CreateUserDto, UpdateUserDto } from "../@types/user.types";

export const userModel = {
  findMany() {
    return prisma.user.findMany();
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  create(data: CreateUserDto) {
    return prisma.user.create({ data });
  },

  update(id: string, data: UpdateUserDto) {
    return prisma.user.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.user.delete({ where: { id } });
  },
};
```

---

## Routes (`src/routes/user.routes.ts`)

```typescript
import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema } from "../validators/user.schema";

export const userRouter = Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getById);
userRouter.post("/", validate(createUserSchema), userController.create);
userRouter.put("/:id", validate(updateUserSchema), userController.update);
userRouter.delete("/:id", userController.remove);
```

Route registration in `server.ts`:
```typescript
app.use("/api/users", userRouter);
```

---

## Validator Schema (`src/validators/user.schema.ts`)

```typescript
import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
  }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>["body"];
export type UpdateUserDto = z.infer<typeof updateUserSchema>["body"];
```

---

## Validate Middleware (`src/middlewares/validate.middleware.ts`)

```typescript
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
    if (!result.success) {
      res.status(400).json({ success: false, error: result.error.flatten() });
      return;
    }
    next();
  };
```

---

## Auth Middleware (`src/middlewares/auth.middleware.ts`)

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    req.userId = payload.userId; // augmented via @types/express.d.ts
    next();
  } catch {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};
```

---

## Global Error Middleware (`src/middlewares/error.middleware.ts`)

```typescript
import { Request, Response, NextFunction } from "express";
import { AppError } from "../helpers/AppError";

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, error: err.message, code: err.code });
    return;
  }
  console.error(err);
  res.status(500).json({ success: false, error: "Internal server error" });
};
```

---

## AppError (`src/helpers/AppError.ts`)

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = "INTERNAL_ERROR"
  ) {
    super(message);
    this.name = "AppError";
  }
}
```

---

## Config / Env (`src/config/env.ts`)

```typescript
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const env = envSchema.parse(process.env);
```

---

## Prisma Config (`src/config/prisma.ts`)

```typescript
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

---

## Server Bootstrap (`src/server.ts`)

```typescript
import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/error.middleware";
import { userRouter } from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRouter);

// Error handler — must be last
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
```

---

## Express Type Augmentation (`src/@types/express.d.ts`)

```typescript
declare namespace Express {
  interface Request {
    userId?: string;
  }
}
```
