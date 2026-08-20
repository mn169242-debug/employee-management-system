import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  deleteEmployee,
  getEmployee, // <--- Hàm lấy 1 nhân viên theo ID
  updateEmployee, // <--- Hàm cập nhật nhân viên
} from "../controllers/employeeController.js";

const router = express.Router();
router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.get("/:id", authMiddleware, getEmployee); // Lấy thông tin 1 nhân viên để điền vào form Edit
router.put("/:id", authMiddleware, updateEmployee); // Lưu dữ liệu sau khi sửa
router.delete("/:id", authMiddleware, deleteEmployee);

export default router;
