# 💼 Salary Management System

A scalable, production-ready salary management and analytics platform designed for organizations with large employee bases (~10,000+ employees).

---

## 🚀 Problem Statement

HR teams often lack real-time insights into salary distributions across countries, roles, and departments.  
This project goes beyond basic CRUD operations to provide **meaningful salary intelligence**, enabling better decision-making.

---

## 🎯 Goals

- Build a **minimal yet usable salary management system**
- Demonstrate **clean architecture and strong engineering fundamentals**
- Follow **Test-Driven Development (TDD)**
- Use **AI tools intentionally** while maintaining correctness
- Design for **scale and performance (10,000+ employees)**

---

## 🧠 Product Thinking

Instead of a simple employee manager, this system is designed as a:

> **Salary Intelligence Platform**

Key focus areas:
- Insightful analytics (not just data storage)
- Performance-aware backend design
- Extensible architecture for future growth

---

## 🏗️ Architecture Overview

### Backend
- Node.js (Express / Fastify)
- Prisma ORM
- PostgreSQL

### Frontend
- Next.js (React)
- Tailwind CSS + Component Library

### Testing
- Jest
- Supertest
- React Testing Library

---

## ✨ Features

### 👥 Employee Management
- Add, update, delete employees
- View employee list with pagination & filtering
- Search by name, country, job title

---

### 📊 Salary Insights

#### Core Metrics
- Min / Max / Average salary by country
- Average salary by job title (per country)

#### Advanced Insights
- Salary percentiles (P50, P90)
- Department-wise salary insights
- Top earning roles & countries
- Outlier detection (extreme salaries)

---

## ⚡ Performance Considerations

- Indexed queries on `country` and `jobTitle`
- Aggregations handled at DB level (not in-memory)
- Optimized bulk seeding for 10,000 employees
- Pagination for large datasets

---

## 🌱 Data Seeding

- Generates 10,000 employees
- Names created using `first_names.txt` + `last_names.txt`
- Realistic salary distribution across countries and roles
- Batch inserts for performance

---

## 📚 API Documentation (Swagger)

The backend exposes interactive API documentation via **Swagger UI**.

### Accessing Swagger UI

Once the backend server is running, open your browser and navigate to:

```
http://localhost:8000/api-docs
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/employees` | Create a new employee |
| `GET` | `/api/employees` | List all employees (supports pagination & filtering) |
| `GET` | `/api/employees/:id` | Get employee by ID |
| `PUT` | `/api/employees/:id` | Update an employee |
| `DELETE` | `/api/employees/:id` | Delete an employee |
| `GET` | `/api/salary/stats/:country` | Get salary statistics (min/max/avg) by country |
| `GET` | `/api/salary/average/:country/:jobTitle` | Get average salary by role in a country |

### Swagger Configuration

Swagger is configured in `backend/src/docs/swagger.ts` using `swagger-jsdoc` and `swagger-ui-express`.  
All route definitions include `@openapi` JSDoc annotations that are automatically scanned and rendered by Swagger UI.

---

## 🧪 Testing Strategy (TDD)

This project follows strict **Test-Driven Development**:

1. Write failing test ❌  
2. Implement minimal code ✅  
3. Refactor 🔁  

### Coverage Includes:
- Employee CRUD operations
- Salary calculations
- Edge cases (empty data, invalid inputs)

---

## 🤖 AI Usage

AI tools were used to:
- Accelerate boilerplate generation
- Explore alternative implementations
- Validate edge cases

All AI-assisted decisions are documented in: