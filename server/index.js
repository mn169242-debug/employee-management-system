import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salaryRoutes.js";
import leaveRouter from "./routes/leaves.js"; // <-- 1. Import route leave của bạn vào đây (kiểm tra lại tên file route cho khớp, ví dụ leave.js hoặc leaveRoutes.js)
import connectToDatabase from "./db/db.js";

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter); // <-- 2. Đăng ký endpoint API leave ở đây

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
