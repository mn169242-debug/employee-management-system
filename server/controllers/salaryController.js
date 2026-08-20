import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

// Đảm bảo có từ khóa 'export' ở đây
export const addSalary = async (req, res) => {
  try {
    const {
      employeeId,
      month,
      year,
      baseSalary,
      allowance,
      bonus,
      deduction,
      note,
    } = req.body;

    // 1. Kiểm tra nhân viên có tồn tại hay không
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy nhân viên!" });
    }

    // 2. Kiểm tra xem bảng lương của nhân viên này trong tháng/năm đó đã tồn tại chưa
    const existingSalary = await Salary.findOne({ employeeId, month, year });
    if (existingSalary) {
      return res.status(400).json({
        success: false,
        message: `Bảng lương tháng ${month}/${year} của nhân viên này đã tồn tại!`,
      });
    }

    // 3. Tạo mới bản ghi lương
    const newSalary = new Salary({
      employeeId,
      month,
      year,
      baseSalary,
      allowance: allowance || 0,
      bonus: bonus || 0,
      deduction: deduction || 0,
      note,
    });

    await newSalary.save();

    return res.status(201).json({
      success: true,
      message: "Thêm bảng lương thành công!",
      data: newSalary,
    });
  } catch (error) {
    console.error("Error in addSalary:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server nội bộ",
      error: error.message,
    });
  }
};
export const getSalaries = async (req, res) => {
  try {
    // Dùng .populate('employeeId') để lấy luôn thông tin tên, email,... của nhân viên từ bảng Employee
    const salaries = await Salary.find().populate("employeeId", "name email");

    return res.status(200).json({
      success: true,
      salaries,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách lương:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server nội bộ",
      error: error.message,
    });
  }
};
