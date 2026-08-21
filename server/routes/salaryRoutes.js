import express from "express";
import {
  addSalary,
  getSalaries,
  getSalaryByEmployeeId,
} from "../controllers/salaryController.js";

const router = express.Router();

router.post("/", addSalary);
router.get("/", getSalaries);
router.get("/:id", getSalaryByEmployeeId);
export default router;
