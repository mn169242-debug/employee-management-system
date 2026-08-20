import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addDepartment,
  getDepartments,
  deleteDepartment,
  getDepartment,
  updateDepartment, // <-- Đảm bảo đã import hàm này
} from "../controllers/departmentController.js";

const router = express.Router();

router.post("/add", authMiddleware, addDepartment);

// Đảm bảo có đủ cả GET và PUT cho :id
router.get("/:id", authMiddleware, getDepartment);
router.put("/:id", authMiddleware, updateDepartment); // <-- Dòng này cực kỳ quan trọng để nhận lệnh PUT từ nút Save Changes

router.get("/", authMiddleware, getDepartments);
router.delete("/:id", authMiddleware, deleteDepartment);

export default router;
