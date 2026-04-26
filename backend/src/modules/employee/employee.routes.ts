import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  listEmployees,
  updateEmployee,
} from "./employee.service";
import { ListEmployeesParams } from "./employee.types";

const router = Router();

function trimStrings(obj: Record<string, any>): Record<string, any> {
  const trimmed: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      trimmed[key] = value.trim();
    } else {
      trimmed[key] = value;
    }
  }
  return trimmed;
}

/**
 * @openapi
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, jobTitle, department, country, salary]
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               jobTitle: { type: string }
 *               department: { type: string }
 *               country: { type: string }
 *               salary: { type: integer }
 *               experienceYears: { type: integer }
 *     responses:
 *       201: { description: Employee created }
 *       400: { description: Validation error }
 */
router.post("/", async (req, res, next) => {
  try {
    const employee = await createEmployee(trimStrings(req.body));
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/employees:
 *   get:
 *     summary: List all employees with pagination and filters
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *       - in: query
 *         name: country
 *         schema: { type: string }
 *       - in: query
 *         name: jobTitle
 *         schema: { type: string }
 *       - in: query
 *         name: department
 *         schema: { type: string }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by full name (case-insensitive partial match)
 *     responses:
 *       200:
 *         description: Paginated list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data: { type: array }
 *                 total: { type: integer }
 */
router.get("/", async (req, res, next) => {
  try {
    const params: ListEmployeesParams = {
      ...(req.query.limit && { limit: Number(req.query.limit) }),
      ...(req.query.offset && { offset: Number(req.query.offset) }),
      ...(req.query.country && { country: req.query.country as string }),
      ...(req.query.jobTitle && { jobTitle: req.query.jobTitle as string }),
      ...(req.query.department && { department: req.query.department as string }),
      ...(req.query.search && { search: req.query.search as string }),
    };
    const result = await listEmployees(params);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Employee found }
 *       404: { description: Employee not found }
 */
router.get("/:id", async (req, res, next) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               jobTitle: { type: string }
 *               department: { type: string }
 *               country: { type: string }
 *               salary: { type: integer }
 *               experienceYears: { type: integer }
 *     responses:
 *       200: { description: Employee updated }
 *       404: { description: Employee not found }
 *       400: { description: Validation error }
 */
router.put("/:id", async (req, res, next) => {
  try {
    const employee = await updateEmployee(req.params.id, trimStrings(req.body));
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Employee deleted }
 *       404: { description: Employee not found }
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteEmployee(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
