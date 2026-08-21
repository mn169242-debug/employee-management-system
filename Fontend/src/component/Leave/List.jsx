import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

export default function List() {
  const [leaves, setLeaves] = useState([]);
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      // Đảm bảo user._id tồn tại trước khi gọi API
      if (!user || !user._id) return;
      const response = await axios.get(
        `http://localhost:5000/api/leave/${user._id}`,
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách nghỉ phép:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [user]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Tiêu đề và Nút Add New Leave */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Lịch sử nghỉ phép</h3>
        <Link
          to="/employee-dashboard/add-leave"
          className="bg-teal-600 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 transition"
        >
          Add New Leave
        </Link>
      </div>

      {/* Bảng hiển thị danh sách */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600">
              <th className="p-4">Loại</th>
              <th className="p-4">Từ ngày</th>
              <th className="p-4">Đến ngày</th>
              <th className="p-4">Lý do</th>
              <th className="p-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  Chưa có đơn nghỉ nào.
                </td>
              </tr>
            ) : (
              leaves.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.leaveType}</td>
                  <td className="p-4">
                    {new Date(item.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {new Date(item.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">{item.reason}</td>
                  <td className="p-4 font-semibold">
                    <span
                      className={`px-2.5 py-1 rounded text-xs ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
