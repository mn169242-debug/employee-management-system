import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Token Not Provided" });
    }

    // Sửa lại thành .split(" ") có khoảng trắng
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({ success: false, error: "Token Not Found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token Not Valid" });
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Lỗi Verify Token:", error.message);
    return res.status(500).json({ success: false, error: "server error" });
  }
};

export default verifyUser;
