import mongoose from "mongoose";
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  dep_name: { type: String, required: true }, // Sửa require thành required
  description: { type: String }, // Sửa discription thành description (đúng chính tả)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
