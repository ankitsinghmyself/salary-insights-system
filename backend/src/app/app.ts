import express, { Request, Response, NextFunction } from "express";
import { swaggerDocs, swaggerSetup } from "../docs/swagger";
import employeeRoutes from "../modules/employee/employee.routes";
import salaryRoutes from "../modules/salary/salary.routes";

const app = express();

app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerDocs, swaggerSetup);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/employees", employeeRoutes);
app.use("/api/salary", salaryRoutes);

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Error && err.message) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
