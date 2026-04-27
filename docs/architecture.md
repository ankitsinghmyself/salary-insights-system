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

Frontend (Next.js) — *not yet implemented*  
↓  
Backend API (Node.js)  
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

- Unit Tests → Service & utilities  
- Integration Tests → API endpoints  
- Edge Case Tests → Invalid inputs, empty datasets  

---

## 🎨 Frontend Architecture

*Not yet implemented — planned structure:*

```
frontend/  
  features/  
    employees/  
    analytics/  
  components/  
```
### Key Concepts
- Feature-based structure  
- Reusable components  
- API abstraction layer

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

---

## 💡 Future Improvements

- Role-based access control  
- Salary trend analysis  
- Caching layer (Redis)  
- Real-time analytics  