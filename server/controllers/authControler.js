import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong Password" });
    }

    // SỬA Ở ĐÂY: Dùng process.env.JWT_KEY thay cho chuỗi cứng
    const token = jwt.sign(
      { _id: user._id, name: user.name, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
    );

    // Tìm đến dòng res.json trong hàm login và sửa lại thêm user.name vào:
    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name, // 👈 THÊM DÒNG NÀY VÀO
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { login, verify };
