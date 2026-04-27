# 💼 Salary Management System

A scalable salary management and analytics platform designed for organizations with large employee bases (~10,000 employees).

---

## 🚀 Problem Statement

HR teams often lack visibility into salary distribution across countries and roles.  
This system provides structured employee management along with meaningful salary insights.

---

## 🎯 Goals

- Build a minimal yet usable salary management system  
- Demonstrate clean architecture  
- Follow Test-Driven Development (TDD)  
- Design for scale (10,000+ employees)  
- Use AI tools intentionally  

---

## 🧠 Product Thinking

Instead of just CRUD operations, the system focuses on:

**Salary Insights for HR decision-making**

---

## 🏗️ Architecture

Routes → Service → Repository → Database

- Service Layer → Business logic  
- Repository Layer → Database abstraction  
- Prisma ORM → Type-safe DB access  
- SQLite → Lightweight DB  

---

## 🛠 Tech Stack

- Backend: Node.js, Express, TypeScript  
- Database: SQLite + Prisma (PostgreSQL-ready via Prisma migration)
- Testing: Jest  
- API Docs: Swagger  

---

## ✨ Features

### Employee Management
- Create, update, delete employees  
- View employees with pagination  
- Filter employees by country, job title, department  
- Search employees by full name (case-insensitive)  

### Salary Insights
- Overall salary statistics (min / max / avg / total employees)  
- Min / Max / Average salary by country  
- Average salary by job title globally  
- Average salary by role within a country  
- Top earners globally or by country

---

## ⚡ Performance

- Batch inserts using createMany  
- Handles 10,000+ employees efficiently  

---

## 🌱 Data Seeding

Run:
npm run seed

- Generates 10,000 employees  
- Uses batch processing  

---

## ⚙️ Setup & Run

npm install  
npx prisma migrate dev  
npm run seed  
npm test  
npm run dev  

---

## 🌐 API Docs

Swagger UI:
http://localhost:8000/api-docs

---

## 🧪 API Testing

Use:
- Swagger UI  

---

## 🧠 Design Decisions

- Repository Pattern → separation of concerns  
- Prisma → type safety  
- TDD → reliability  
- Batch seeding → performance  

---

## 🤖 AI Usage

AI tools were used to:
- Generate boilerplate  
- Validate edge cases  
- Speed up development  

All logic and final decisions were reviewed manually.

---

## 📌 Future Improvements

- Frontend UI (Next.js)  
- Authentication & role-based access  
- Advanced salary analytics & trends  
- Caching layer (Redis)  
- Export reports (CSV / PDF)

---

## 🎥 Demo

TODO: (Add your video link here)

---

## 👤 Author

Ankit Singh  
Senior Frontend Engineer (5+ years)
