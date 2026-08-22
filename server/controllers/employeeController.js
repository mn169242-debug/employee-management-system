import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import fs from "fs";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const employee = await Employee.findOne({ email });
    if (employee) {
      return res
        .status(400)
        .json({ success: false, error: "Employee already registered in app" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password: hashPassword,
      role,
      image: req.file ? req.file.filename : "",
    });

    await newEmployee.save();

    return res
      .status(200)
      .json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    let employee = await Employee.findById(id).populate("department");

    if (!employee) {
      employee = await Employee.findOne({ userId: id }).populate("department");
    }

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get employee server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    if (employee.image && fs.existsSync(`public/${employee.image}`)) {
      fs.unlinkSync(`public/${employee.image}`);
    }

    return res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error deleting employee" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, salary, department } = req.body;

    const updateData = {
      name,
      maritalStatus,
      designation,
      salary,
      department,
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      updatedEmployee,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Update employee server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const userEmail = req.user?.email;

    if (!userId && !userEmail) {
      return res
        .status(401)
        .json({ success: false, error: "Token không hợp lệ!" });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Vui lòng nhập đầy đủ mật khẩu cũ và mới!",
        });
    }

    // 1. Tìm trong bảng Employee trước
    let employee = await Employee.findById(userId).catch(() => null);
    if (!employee && userEmail) {
      employee = await Employee.findOne({ email: userEmail });
    }

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Không tìm thấy tài khoản nhân viên!" });
    }

    // 2. Tìm trong bảng User (bảng dùng để đăng nhập) theo email
    const user = await User.findOne({ email: employee.email || userEmail });
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          error: "Không tìm thấy tài khoản User tương ứng để đăng nhập!",
        });
    }

    // 3. Kiểm tra mật khẩu cũ dựa trên bảng User (hoặc Employee)
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Mật khẩu cũ không chính xác!" });
    }

    // 4. Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // 5. Cập nhật mật khẩu mới cho CẢ HAI bảng để đồng bộ tuyệt đối
    user.password = hashPassword;
    await user.save();

    employee.password = hashPassword;
    await employee.save();

    return res
      .status(200)
      .json({ success: true, message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    console.error("LỖI ĐỔI MẬT KHẨU:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  changePassword, // Thêm export này vào
};
