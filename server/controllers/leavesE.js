import Leave from "../models/Leaves.js";

// Tạo đơn xin nghỉ phép
export const addLeave = async (req, res) => {
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
    return res
      .status(200)
      .json({ success: true, message: "Đã gửi đơn nghỉ phép" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Lấy danh sách tất cả đơn nghỉ phép (cho Admin)
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: { path: "department" },
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Duyệt hoặc từ chối đơn
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Approved' hoặc 'Rejected'
    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
