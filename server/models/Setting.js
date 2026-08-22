const mongoose = require("mongoose");

const employeeSettingsSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    department: { type: String, default: "" },
    role: { type: String, default: "Employee" },
    settings: {
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      language: { type: String, default: "vi" },
      notifications: {
        emailAlerts: { type: Boolean, default: true },
        pushNotifications: { type: Boolean, default: false },
        weeklyDigest: { type: Boolean, default: true },
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("EmployeeSettings", employeeSettingsSchema);
