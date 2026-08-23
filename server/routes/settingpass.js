import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import authMiddleWare from "../middleware/authMiddleWare.js";

const router = express.Router();

router.put("/change-password", authMiddleWare, async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // In log để kiểm tra userId client gửi lên
    console.log("Server nhận được userId từ client gửi lên là:", userId);

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "Thiếu userId truyền lên!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Không tìm thấy tài khoản quản trị viên!",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Mật khẩu cũ không chính xác" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Đổi mật khẩu thành công" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
