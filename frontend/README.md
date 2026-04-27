# Salary Insights - Frontend

Next.js frontend for the Salary Management System.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **UI Primitives**: Radix UI
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

## Architecture

### Feature-Based Structure

```
app/                 # Next.js app router pages
components/
  ui/               # Reusable UI primitives (Button, Input, Card, etc.)
  features/         # Feature-specific components
  providers/        # React context/providers
hooks/              # Custom React Query hooks
lib/
  api/              # API client layer (SRP)
    client.ts       # Axios instance
    types.ts        # Shared TypeScript types
    employees.ts    # Employee API methods
    salary.ts       # Salary API methods
  utils.ts          # Utility functions (cn helper)
```

### Design Principles

- **Single Responsibility Principle**: Each module has one reason to change
  - `lib/api/employees.ts` → Only employee API calls
  - `lib/api/salary.ts` → Only salary API calls
  - `hooks/use-employees.ts` → Only employee data fetching logic
  - `hooks/use-salary-stats.ts` → Only salary stats logic

- **Test-Driven Development**: Tests written before or alongside implementation
  - API layer fully tested with mocked axios
  - Hooks tested with React Query test utilities
  - Components tested for rendering and interactions

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test:run

# Run tests in watch mode
npm test

# Build for production
npm run build
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## Pages

- `/` — Dashboard with salary insights (overall stats, country stats, top earners, job title averages)
- `/employees` — Employee management (CRUD with pagination and search)

## API Integration

The frontend connects to the backend API running on `http://localhost:8000`:

- `GET/POST/PUT/DELETE /api/employees` — Employee CRUD
- `GET /api/salary/overall-stats` — Overall salary statistics
- `GET /api/salary/stats/:country` — Country-specific stats
- `GET /api/salary/by-jobtitle` — Average salary by job title
- `GET /api/salary/top-earners` — Top earning employees

