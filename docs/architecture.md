# 🏗️ Architecture Overview

## 🎯 Objective

Design a scalable, maintainable, and testable system to manage employee data and generate salary insights for an organization with ~10,000 employees.

---

## 🧠 Design Principles

- Separation of Concerns  
- Single Responsibility Principle  
- Testability First (TDD)  
- Performance-aware Design  
- Scalability without over-engineering  

---

## 🧩 High-Level Architecture

Frontend (Next.js 16 + React 19)  
↓  
Backend API (Node.js + Express)  
↓  
Service Layer (Business Logic)  
↓  
Repository Layer (Data Access)  
↓  
Database (SQLite)

---

## 🔷 Backend Architecture

The backend follows a layered architecture:

Routes → Service → Repository → Database  

### Routes Layer
- Handles HTTP requests & responses  
- Performs input validation  
- Delegates to service layer

### Service Layer
- Contains business logic  
- Handles salary calculations  
- Orchestrates repository calls  

### Repository Layer
- Handles database interactions  
- Uses Prisma ORM  
- Abstracts persistence logic  

### Database Layer
- SQLite database  
- Optimized for aggregation queries  
- Lightweight and zero-config for development

---

## 🎨 Frontend Architecture

The frontend follows a feature-based component architecture with strict separation of concerns:

```
frontend/  
  app/              # Next.js App Router pages
    page.tsx        # Dashboard (salary insights)
    employees/      # Employee management page
    layout.tsx      # Root layout with nav + QueryClientProvider
  components/
    ui/             # Reusable UI primitives (Button, Input, Card, Dialog, etc.)
    features/       # Feature-specific components
      employee-list.tsx
      employee-form.tsx
      salary-dashboard.tsx
      country-stats.tsx
      job-title-stats.tsx
      top-earners.tsx
    providers/      # React context/providers
      query-provider.tsx
  hooks/            # Custom React Query hooks (SRP)
    use-employees.ts
    use-salary-stats.ts
  lib/
    api/            # API client layer (SRP)
      client.ts     # Axios instance
      types.ts      # Shared TypeScript types
      employees.ts  # Employee API methods
      salary.ts     # Salary API methods
    utils.ts        # Utility functions
```

### Design Decisions

**Single Responsibility Principle applied:**
- `lib/api/employees.ts` → Only employee API calls
- `lib/api/salary.ts` → Only salary API calls  
- `hooks/use-employees.ts` → Only employee data fetching logic
- `hooks/use-salary-stats.ts` → Only salary stats logic
- `components/features/employee-list.tsx` → Only employee list UI
- `components/features/salary-dashboard.tsx` → Only stats display UI

**Test-Driven Development:**
- API layer: `employees.test.ts`, `salary.test.ts` — mocked axios
- Hooks: `use-employees.test.tsx`, `use-salary-stats.test.tsx` — React Query test utilities
- Components: `button.test.tsx`, `empty-state.test.tsx`, `salary-dashboard.test.tsx`

**Tech Stack:**
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 for styling
- TanStack Query for server state
- React Hook Form + Zod for form validation
- Radix UI for accessible primitives
- Vitest + React Testing Library for testing

---

## 📦 Module Structure
```
backend/  
  modules/  
    employee/  
      employee.routes.ts      # Express routes (HTTP layer)
      employee.service.ts     # Business logic
      employee.repository.ts  # Database access
      employee.types.ts       # TypeScript types
      employee.validation.ts  # Input validation
      employee.service.test.ts
      employee.routes.test.ts

    salary/  
      salary.routes.ts        # Express routes (HTTP layer)
      salary.service.ts       # Business logic
      salary.service.test.ts
      salary.routes.test.ts
```
---

## 🗄️ Data Model

### Employee Entity

- id: Unique identifier  
- firstName: Employee first name  
- lastName: Employee last name  
- fullName: Computed field  
- jobTitle: Role of employee  
- country: Employee location  
- salary: Compensation (integer)  
- department: Department name  
- experienceYears: Years of experience (default: 0)  
- createdAt: Timestamp  
- updatedAt: Timestamp

---

## 📊 Salary Insights Design

All salary insights are computed using database-level aggregation.

### Implemented Endpoints:
- `GET /api/salary/overall-stats` — Overall min / max / avg / total employees  
- `GET /api/salary/stats/:country` — Min / max / avg salary for a country  
- `GET /api/salary/average/:country/:jobTitle` — Average salary by role in a country  
- `GET /api/salary/by-jobtitle` — Average salary grouped by job title globally  
- `GET /api/salary/top-earners?country=&limit=` — Top earning employees globally or by country

### Why DB Aggregation?

- Reduces memory usage  
- Improves performance  
- Leverages database optimizations  

---

## ⚡ Performance Considerations

### Indexing
- Index on `country`  
- Index on `jobTitle`  
- Index on `department`

### Query Optimization
- Use GROUP BY queries  
- Avoid loading large datasets into memory  

### Pagination
- Required for employee listing  
- Prevents API and UI overload  

### Frontend Optimizations
- TanStack Query caching with staleTime
- Pagination on employee list (10 per page)
- Search debouncing ready for implementation
- Skeleton loaders for loading states

---

## 🌱 Data Seeding Strategy

- Bulk insert (batch processing)  
- Avoid row-by-row insertion  
- Generate 10,000 employees  
- Use realistic/random salary distribution  

---

## 🧪 Testing Architecture

### Approach: Test-Driven Development (TDD)

Flow:
1. Write failing test  
2. Implement minimal code  
3. Refactor  

### Test Types

- **Unit Tests** → Service & utilities  
- **Integration Tests** → API endpoints  
- **Component Tests** → UI rendering & interactions
- **Hook Tests** → React Query logic

### Frontend Test Coverage

| Layer | Tests |
|-------|-------|
| API Client | `employees.test.ts`, `salary.test.ts` |
| Hooks | `use-employees.test.tsx`, `use-salary-stats.test.tsx` |
| UI Components | `button.test.tsx`, `empty-state.test.tsx` |
| Features | `salary-dashboard.test.tsx` |

---

## 🔄 Data Flow

1. User interacts with UI  
2. Request sent to backend  
3. Routes validate input  
4. Service processes logic  
5. Repository interacts with DB  
6. Response returned to UI

---

## 🤖 AI-Assisted Development

AI tools were used for:
- Boilerplate generation  
- Exploring alternatives  
- Improving test coverage  

See: docs/ai-usage.md  

---

## ⚖️ Trade-offs & Decisions

### PostgreSQL vs SQLite
- SQLite chosen for simplicity and zero-config development
- Prisma makes migration to PostgreSQL seamless if needed

### Layered Architecture vs Simple CRUD
- Layered design improves maintainability  

### DB Aggregation vs In-Memory
- DB aggregation ensures better performance  

### Client-Side vs Server-Side Rendering
- Used Client Components ("use client") for interactive pages
- Simplifies state management with React Query
- Next.js App Router ready for SSR migration if needed

---

## 💡 Future Improvements

- Role-based access control  
- Salary trend analysis  
- Caching layer (Redis)  
- Real-time analytics  
- CSV/PDF export for reports
- Advanced filtering with multiple criteria

