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

- **Backend**: Node.js, Express, TypeScript  
- **Frontend**: Next.js 16, TypeScript, Tailwind CSS v4, TanStack Query
- **Database**: SQLite + Prisma (PostgreSQL-ready via Prisma migration)
- **Testing**: Jest (backend), Vitest (frontend)
- **API Docs**: Swagger

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

Run from the `backend` folder:

```bash
cd backend
npm run seed
```

- Generates 10,000 employees by default
- Uses batch processing (1,000 per batch) for performance
- Supports optional environment variables:
  - `SEED_RESET=true` — clear existing data before seeding
  - `SEED_TOTAL=5000` — total records to generate
  - `SEED_BATCH_SIZE=500` — records per batch

Example:
```bash
SEED_RESET=true SEED_TOTAL=5000 npm run seed
```

> **Note:** Copy `backend/.env.example` to `backend/.env` and adjust values as needed.

---

## ⚙️ Setup & Run

### Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run seed
npm run dev        # starts on http://localhost:8000
npm test           # run Jest tests
```

### Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev        # starts on http://localhost:3000
npm run test:run   # run Vitest tests
```

### Start Both

1. Start the backend first (port 8000)
2. In a new terminal, start the frontend (port 3000)
3. Open http://localhost:3000 to use the app

> **Important:** The frontend `NEXT_PUBLIC_API_BASE_URL` must point to the running backend (`http://localhost:8000/api` by default).

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

