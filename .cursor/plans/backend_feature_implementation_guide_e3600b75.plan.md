---
name: Backend Feature Implementation Guide
overview: Create a comprehensive markdown guide documenting the step-by-step process for implementing backend features in this stack, following the database-first approach and using placeholders for feature names.
todos: []
---

# Backend Feature Implementation Guide

This guide documents the step-by-step process for implementing a new feature in the backend, following our database-first approach and code standards.

## Overview

The implementation flow follows this order:

1. **Database Schema** (Source of Truth) - Define the data model
2. **Zod Schemas** - Transform database schema to Zod validation schemas
3. **Database Queries** - Create pure functions for database operations
4. **API Procedures** - Create ORPC procedures for CRUD operations
5. **Route Registration** - Register routes in the main router

## Step-by-Step Implementation

### Step 1: Database Schema (Source of Truth)

**Location**: `packages/database/drizzle/schema/postgres.ts`

Always start with the database schema. Humans model the database first to avoid complications later.

1. Define your table schema in `postgres.ts`:

   - Use Drizzle ORM with PostgreSQL
   - Follow the existing pattern for table definitions
   - Example structure:
   ```typescript
   export const {featureName}Table = pgTable("{feature-name}", {
     id: varchar("id", { length: 255 })
       .$defaultFn(() => cuid())
       .primaryKey(),
     // ... other fields
     createdAt: timestamp("createdAt").notNull().defaultNow(),
     updatedAt: timestamp("updatedAt").notNull().defaultNow(),
     userId: text("userId")
       .notNull()
       .references(() => user.id, { onDelete: "cascade" }),
   });
   ```


2. **Human Task**: Define relations in the same file:
   ```typescript
   export const userRelations = relations(user, ({ many }) => ({
     sessions: many(session),
     accounts: many(account),
     {featureName}s: many({featureName}Table),
   }));
   ```


**Note**: After schema creation, the human should verify and confirm the schema is correct before proceeding.

### Step 2: Zod Schema Generation

**Location**: `packages/database/drizzle/zod.ts`

Transform the PostgreSQL schema into Zod validation schemas using `drizzle-zod`.

1. Add schema exports following the pattern:
   ```typescript
   export const Insert{FeatureName}Schema = createInsertSchema({featureName}Table);
   export const {FeatureName}Schema = createSelectSchema({featureName}Table);
   export const {FeatureName}UpdateSchema = createUpdateSchema({featureName}Table, {
     id: z.string()
   });
   ```


**Reference**: See existing patterns in `packages/database/drizzle/zod.ts` (lines 8-24)

### Step 3: Database Queries

**Location**: `packages/database/drizzle/queries/{feature-name}.ts`

Create pure functions that only manipulate the database. Follow the pattern from `packages/auth/client.ts` as a reference for clean function structure.

1. Create a new file: `packages/database/drizzle/queries/{feature-name}.ts`

2. Implement CRUD operations as pure functions:

   - `get{FeatureName}List({ userId }: { userId: string })` - List items
   - `insert{FeatureName}(data: z.infer<typeof Insert{FeatureName}Schema>)` - Create
   - `get{FeatureName}ById(id: string)` - Read single item
   - `get{FeatureName}sByUserId(userId: string)` - List by user
   - `update{FeatureName}(data: z.infer<typeof {FeatureName}UpdateSchema>)` - Update
   - `delete{FeatureName}(id: string)` - Soft delete (set isActive: false)

3. Export functions from `packages/database/drizzle/queries/index.ts`:
   ```typescript
   export * from "./{feature-name}";
   ```


**Reference**: See `packages/database/drizzle/queries/fun-facts.ts` for complete examples

### Step 4: API Procedures

**Location**: `packages/api/src/modules/{feature-name}/procedures/`

Create ORPC procedures for your CRUD operations.

1. Create the module directory: `packages/api/src/modules/{feature-name}/procedures/`

2. Create procedure files:

   - **List Procedure** (`get-{feature-name}-list-procedure.ts`):
     - Use `protectedProcedure` for authenticated routes
     - Use `PaginationSchema` for paginated lists
     - Reference: `packages/api/src/modules/fun-fact/procedures/get-funfact-list-procedure.ts`

   - **Create Procedure** (`create-{feature-name}-procedure.ts`):
     - Omit `userId` from input schema (added automatically)
     - Use `protectedProcedure`
     - Reference: `packages/api/src/modules/fun-fact/procedures/create-funfact-procedure.ts`

   - **Update Procedure** (`update-{feature-name}-procedure.ts`):
     - Use `{FeatureName}UpdateSchema` as input
     - Use `protectedProcedure`

   - **Delete Procedure** (`delete-{feature-name}-procedure.ts`):
     - Accept id as input
     - Use `protectedProcedure`

3. Create route file: `packages/api/src/modules/{feature-name}/route.ts`
   ```typescript
   import { create{FeatureName}Procedure } from "./procedures/create-{feature-name}-procedure";
   import { get{FeatureName}ListProcedure } from "./procedures/get-{feature-name}-list-procedure";
   // ... other imports
   
   export const {featureName}Route = {
     create{FeatureName}: create{FeatureName}Procedure,
     get{FeatureName}List: get{FeatureName}ListProcedure,
     // ... other procedures
   };
   ```


**Reference**: See `packages/api/src/modules/fun-fact/route.ts` for structure

### Step 5: Register Routes

**Location**: `packages/api/src/orpc/router.ts`

Register your feature route in the main router.

1. Import your route:
   ```typescript
   import { {featureName}Route } from "../modules/{feature-name}/route";
   ```

2. Add to router:
   ```typescript
   export const router = baseRouter.router({
     funFact: funFactRoute,
     {featureName}: {featureName}Route,
   });
   ```


**Reference**: See `packages/api/src/orpc/router.ts` (lines 9-11)

## Result

After completing these steps:

- ✅ Swagger documentation is automatically generated
- ✅ API routes are available and typed
- ✅ Database operations are properly abstracted
- ✅ Type safety is maintained throughout the stack

## Notes

- Always start with the database schema (human models it)
- Use `protectedProcedure` for authenticated routes, `publicProcedure` for public routes
- For paginated lists, use `PaginationSchema` from `@gebra/database`
- Follow the naming convention: `{feature-name}` for folders/files, `{FeatureName}` for types/components
- Procedures automatically have access to `context.user` when using `protectedProcedure`