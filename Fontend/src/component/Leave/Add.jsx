import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"; // Đường dẫn đến context auth của bạn

export default function Add() {
  const [leaveType, setLeaveType] = useState("Phép năm");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const { user } = useAuth(); // Lấy thông tin user hiện tại từ Context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/leave/add", {
        employeeId: user._id, // Lấy ID của nhân viên đang đăng nhập
        leaveType,
        startDate,
        endDate,
        reason,
      });

      if (response.data.success) {
        alert("Gửi đơn thành công!");
        navigate("/employee-dashboard/leaves"); // Chuyển hướng về trang danh sách đơn nghỉ
      }
    } catch (error) {
      console.error("Lỗi khi thêm đơn nghỉ:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Xin nghỉ phép</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loại nghỉ
          </label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="Phép năm">Phép năm</option>
            <option value="Nghỉ ốm">Nghỉ ốm</option>
            <option value="Việc riêng">Việc riêng</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Từ ngày
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Đến ngày
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lý do
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            rows="3"
            placeholder="Nhập lý do xin nghỉ..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded font-medium hover:bg-teal-700 transition"
        >
          Gửi đơn
        </button>
      </form>
    </div>
  );
}
