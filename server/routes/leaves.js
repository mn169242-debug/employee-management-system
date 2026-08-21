import express from "express";
import Leave from "../models/Leaves.js"; // Đã khớp tên file có chữ 's' và có đuôi .js

const router = express.Router();

// 1. API Thêm đơn nghỉ phép (Add Leave)
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

// 2. API Lấy danh sách đơn nghỉ phép (Get Leaves List)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const leaves = await Leave.find({ employeeId: id });
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
