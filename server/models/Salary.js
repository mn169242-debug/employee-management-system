import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: { type: Number, required: true }, // Tháng (1-12)
  year: { type: Number, required: true }, // Năm (ví dụ: 2026)
  baseSalary: { type: Number, required: true }, // Lương cơ bản
  allowance: { type: Number, default: 0 }, // Phụ cấp
  bonus: { type: Number, default: 0 }, // Thưởng
  deduction: { type: Number, default: 0 }, // Các khoản khấu trừ (phạt, thuế, bảo hiểm...)
  netSalary: { type: Number }, // Thực nhận (Tính tự động)
  note: { type: String }, // Ghi chú
  createdAt: { type: Date, default: Date.now },
});

// Middleware tự động tính lương thực nhận trước khi lưu
salarySchema.pre("save", function (next) {
  this.netSalary =
    this.baseSalary + this.allowance + this.bonus - this.deduction;
});

// Sử dụng export default thay cho module.exports
const Salary = mongoose.model("Salary", salarySchema);
export default Salary;
