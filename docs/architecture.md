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

Frontend (Next.js)  
↓  
Backend API (Node.js)  
↓  
Service Layer (Business Logic)  
↓  
Repository Layer (Data Access)  
↓  
Database (PostgreSQL)  

---

## 🔷 Backend Architecture

The backend follows a layered architecture:

Controller → Service → Repository → Database  

### Controller Layer
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
- PostgreSQL database  
- Optimized for aggregation queries  

---

## 📦 Module Structure
```
backend/  
  modules/  
    employee/  
      employee.controller.ts  
      employee.service.ts  
      employee.repository.ts  
      employee.test.ts  

    salary/  
      salary.service.ts  
      salary.test.ts  
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
- salary: Compensation  
- currency: Salary currency  
- department: Department name  
- experienceYears: Years of experience  
- createdAt: Timestamp  

---

## 📊 Salary Insights Design

All salary insights are computed using database-level aggregation.

### Examples:
- Average salary by country  
- Average salary by job title within a country  
- Min / Max salary per country  

### Why DB Aggregation?

- Reduces memory usage  
- Improves performance  
- Leverages database optimizations  

---

## ⚡ Performance Considerations

### Indexing
- Index on `country`  
- Index on `jobTitle`  

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
3. Controller validates input  
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
- PostgreSQL chosen for scalability and realism  

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