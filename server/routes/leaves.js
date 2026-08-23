import express from "express";
import Leave from "../models/Leaves.js";

const router = express.Router();

// ==================== PHẦN DÀNH CHO NHÂN VIÊN (EMPLOYEE) ====================

// 1. API Thêm đơn nghỉ phép mới
router.post("/add", async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    const newLeave = new Leave({
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    res.status(201).json({
      success: true,
      message: "Thêm đơn nghỉ thành công",
      leave: newLeave,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. API Lấy danh sách đơn nghỉ của MỘT nhân viên cụ thể (Code bạn vừa gửi)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const leaves = await Leave.find({ employeeId: id });
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== PHẦN DÀNH CHO ADMIN ====================

// 3. API Lấy danh sách đơn nghỉ của TẤT CẢ nhân viên (Admin xem toàn bộ)
// Lưu ý: Dùng đường dẫn /admin/all để tránh bị xung đột với route /:id ở trên
router.get("/admin/all", async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: { path: "department" },
    });
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. API Duyệt hoặc Từ chối đơn nghỉ phép
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Nhận 'Approved' hoặc 'Rejected'

    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      leave,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
