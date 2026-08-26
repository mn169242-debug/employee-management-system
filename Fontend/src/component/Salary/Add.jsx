import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddSalary() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    baseSalary: "",
    allowance: "",
    bonus: "",
    deduction: "",
    note: "",
  });

  const [employees, setEmployees] = useState([]); // Lưu danh sách nhân viên để hiển thị select
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // 1. Gọi API lấy danh sách nhân viên khi component được tải lần đầu
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "import.meta.env.VITE_API_URL || 'http://localhost:5000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi kèm token để xác thực
            },
          },
        );

        if (response.data.success) {
          setEmployees(response.data.employees || response.data.data || []);
          // ĐÃ XÓA LỆNH NAVIGATE Ở ĐÂY ĐỂ TRÁNH BỊ TỰ ĐỘNG CHUYỂN TRANG KHÔNG CHO NHẬP LIỆU
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách nhân viên:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "import.meta.env.VITE_API_URL || 'http://localhost:5000/api/salary",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Nhớ gửi token khi thêm dữ liệu nếu backend yêu cầu bảo mật
          },
        },
      );

      if (response.data.success) {
        setMessage({ text: "Thêm bảng lương thành công!", type: "success" });

        // Sau khi thêm thành công, có thể chờ 1.5 giây rồi chuyển về trang danh sách để xem kết quả
        setTimeout(() => {
          navigate("/admin-dashboard/salaries");
        }, 1500);
      }
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message || "Có lỗi xảy ra khi thêm bảng lương.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Thêm Bảng Lương Nhân Viên
      </h2>

      {message.text && (
        <div
          className={`p-3 mb-6 rounded-md text-white text-sm ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chọn Nhân viên
          </label>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">-- Chọn nhân viên --</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name || emp.fullName || emp.email} (Mã:{" "}
                {emp.employeeId || emp._id.slice(-6)})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tháng
            </label>
            <input
              type="number"
              name="month"
              min="1"
              max="12"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Năm
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lương cơ bản
          </label>
          <input
            type="number"
            name="baseSalary"
            value={formData.baseSalary}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phụ cấp
          </label>
          <input
            type="number"
            name="allowance"
            value={formData.allowance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thưởng
          </label>
          <input
            type="number"
            name="bonus"
            value={formData.bonus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Khấu trừ (Phạt, thuế, bảo hiểm...)
          </label>
          <input
            type="number"
            name="deduction"
            value={formData.deduction}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập ghi chú (nếu có)..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Đang xử lý..." : "Lưu bảng lương"}
        </button>
      </form>
    </div>
  );
}
