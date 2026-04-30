import { Router } from "express";
import {
  getAverageSalaryByRoleInCountry,
  getAverageSalaryByJobTitle,
  getOverallStats,
  getSalaryStatsByCountry,
  getTopEarners,
  getGrossSalary,
  getTaxDeduction,
  getNetSalary,
  getEmployeeSalaryDetails,
} from "./salary.service";

const router = Router();

/**
 * @openapi
 * /api/salary/overall-stats:
 *   get:
 *     summary: Get overall salary statistics across all employees
 *     tags: [Salary]
 *     responses:
 *       200:
 *         description: Overall salary stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 min: { type: number }
 *                 max: { type: number }
 *                 avg: { type: number }
 *                 total: { type: number }
 */
router.get("/overall-stats", async (req, res, next) => {
  try {
    const stats = await getOverallStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/salary/by-jobtitle:
 *   get:
 *     summary: Get average salary grouped by job title
 *     tags: [Salary]
 *     responses:
 *       200:
 *         description: List of job titles with average salaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   jobTitle: { type: string }
 *                   average: { type: number }
 *                   count: { type: number }
 */
router.get("/by-jobtitle", async (req, res, next) => {
  try {
    const data = await getAverageSalaryByJobTitle();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/salary/top-earners:
 *   get:
 *     summary: Get top earners globally or by country
 *     tags: [Salary]
 *     parameters:
 *       - in: query
 *         name: country
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of top earning employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   fullName: { type: string }
 *                   jobTitle: { type: string }
 *                   country: { type: string }
 *                   salary: { type: number }
 */
router.get("/top-earners", async (req, res, next) => {
  try {
    const country = req.query.country as string | undefined;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const data = await getTopEarners(country, limit);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/salary/stats/{country}:
 *   get:
 *     summary: Get salary statistics by country
 *     tags: [Salary]
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Salary stats (min, max, avg)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 country: { type: string }
 *                 min: { type: number }
 *                 max: { type: number }
 *                 avg: { type: number }
 *       404:
 *         description: No employees found for this country
 */
router.get("/stats/:country", async (req, res, next) => {
  try {
    const stats = await getSalaryStatsByCountry(req.params.country);
    if (!stats) {
      res.status(404).json({ message: "No employees found for this country" });
      return;
    }
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/salary/average/{country}/{jobTitle}:
 *   get:
 *     summary: Get average salary by role in country
 *     tags: [Salary]
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: jobTitle
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Average salary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average: { type: number }
 *       404:
 *         description: No data found for this role/country
 */
router.get("/average/:country/:jobTitle", async (req, res, next) => {
  try {
    const average = await getAverageSalaryByRoleInCountry(
      req.params.country,
      req.params.jobTitle
    );
    if (average === null) {
      res.status(404).json({ message: "No data found for this role/country" });
      return;
    }
    res.json({ average });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/salary/gross/{employeeId}:
 *   get:
 *     summary: Get gross salary for an employee
 *     tags: [Salary]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Gross salary amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grossSalary: { type: number }
 *       404:
 *         description: Employee not found
 */
router.get("/gross/:employeeId", async (req, res, next) => {
  try {
    const grossSalary = await getGrossSalary(req.params.employeeId);
    if (grossSalary === null) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json({ grossSalary });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/salary/tax/{employeeId}:
 *   get:
 *     summary: Get tax deduction for an employee
 *     tags: [Salary]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Tax deduction amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taxDeduction: { type: number }
 *       404:
 *         description: Employee not found
 */
router.get("/tax/:employeeId", async (req, res, next) => {
  try {
    const taxDeduction = await getTaxDeduction(req.params.employeeId);
    if (taxDeduction === null) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json({ taxDeduction });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/salary/net/{employeeId}:
 *   get:
 *     summary: Get net salary after tax for an employee
 *     tags: [Salary]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Net salary amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 netSalary: { type: number }
 *       404:
 *         description: Employee not found
 */
router.get("/net/:employeeId", async (req, res, next) => {
  try {
    const netSalary = await getNetSalary(req.params.employeeId);
    if (netSalary === null) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json({ netSalary });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/salary/details/{employeeId}:
 *   get:
 *     summary: Get complete salary details (gross, tax, net) for an employee
 *     tags: [Salary]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Complete salary details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employeeId: { type: string }
 *                 baseSalary: { type: number }
 *                 grossSalary: { type: number }
 *                 taxDeduction: { type: number }
 *                 netSalary: { type: number }
 *                 country: { type: string }
 *       404:
 *         description: Employee not found
 */
router.get("/details/:employeeId", async (req, res, next) => {
  try {
    const details = await getEmployeeSalaryDetails(req.params.employeeId);
    if (!details) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json(details);
  } catch (err) {
    next(err);
  }
});

export default router;
