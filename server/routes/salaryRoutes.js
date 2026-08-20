import express from "express";
import { addSalary, getSalaries } from "../controllers/salaryController.js";

const router = express.Router();

router.post("/", addSalary);
router.get("/", getSalaries);
export default router;
