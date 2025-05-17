# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `pnpm dev` - Start the development server on port 3000
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server on port 3000
- `pnpm lint` - Run ESLint to check code quality
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run Jest tests

### Database Operations

- `pnpm db:studio` - Open Drizzle Studio to browse and manage database
- `pnpm db:push` - Push schema changes to the database
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:migrate` - Run Drizzle migrations
- `pnpm db:seed` - Seed the database with initial data
- `pnpm db:execute` - Execute custom database operations
- `pnpm db:reset` - Reset the database (delete and recreate with seed data)

### UI Components

- `pnpm ui:add` - Add shadcn UI components
- `pnpm ui:diff` - Show diffs for shadcn UI components

## Architecture

This is a Next.js 15 application using the App Router with TypeScript and React 19. The project uses Drizzle ORM with SQLite/Turso for the database and Clerk for authentication.

### Key Architecture Components

1. **Data Layer**

   - Uses Drizzle ORM with SQLite (via Turso)
   - Database schema defined in `/src/db/schema.ts`
   - Server-side data fetching with custom query/action system

2. **API Layer**

   - Custom query and action system in `/src/lib/data/`
   - Server queries (`/src/api/query.ts`) - Read operations
   - Server actions (`/src/api/action.ts`) - Write operations
   - Type-safe API with Zod validation

3. **UI Layer**

   - Next.js App Router
   - React Server Components
   - Tailwind CSS for styling
   - shadcn/ui components

4. **Authentication**
   - Clerk for authentication and user management
   - Protected and admin-only actions

### Data Flow

1. **Server Queries (Read Operations)**

   - Defined in `/src/data/*/query.ts` directories
   - Aggregated in `/src/api/query.ts`
   - Use `createQuery` from `/src/lib/data/server/createQueryClient.ts`
   - Support caching and revalidation

2. **Server Actions (Write Operations)**

   - Defined in `/src/data/*/action.ts` directories
   - Aggregated in `/src/api/action.ts`
   - Use `createAction` from `/src/lib/data/server/createActionClient.ts`
   - Support validation, error handling, and protected actions

3. **Client Components**
   - Use `useAction` and client-side data hooks for data fetching and mutations
   - Context providers for state management
   - Auto-animate for animations

### Core Domain Model

The application is a resource directory for life-centered design with the following entities:

- Resources - Main content items
- Categories - Classification for resources
- Types - Type of resource (e.g., "Thoughtleader", etc.)
- Topics - Tags for resources
- Comments - User comments on resources
- Likes - User likes on resources

### Feature Structure

The codebase is organized by feature, with components, pages, and data operations grouped together:

- `/src/app/` - Next.js App Router pages
- `/src/components/` - Shared React components
- `/src/data/` - Server-side data fetching and mutations
- `/src/design-system/` - UI component design system
- `/src/lib/` - Shared utilities and helpers
- `/src/db/` - Database schema and operations

