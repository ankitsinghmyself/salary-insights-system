import { Router } from "express";
import {
  getAverageSalaryByRoleInCountry,
  getSalaryStatsByCountry,
} from "./salary.service";

const router = Router();

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salary stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 min:
 *                   type: number
 *                 max:
 *                   type: number
 *                 avg:
 *                   type: number
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
 *         schema:
 *           type: string
 *       - in: path
 *         name: jobTitle
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Average salary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
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
      res
        .status(404)
        .json({ message: "No data found for this role/country" });
      return;
    }
    res.json({ average });
  } catch (err) {
    next(err);
  }
});

export default router;
