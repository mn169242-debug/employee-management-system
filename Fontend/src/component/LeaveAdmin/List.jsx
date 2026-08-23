import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token hiện tại:", token); // Kiểm tra xem có token không

      const response = await axios.get(
        "http://localhost:5000/api/leave/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("Dữ liệu trả về từ server:", response.data); // Kiểm tra data trả về

      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.error(
        "Lỗi chi tiết khi tải danh sách đơn nghỉ:",
        error.response || error.message,
      );
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Hàm xử lý Duyệt hoặc Từ chối đơn
  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      if (response.data.success) {
        fetchLeaves(); // Tải lại danh sách sau khi cập nhật thành công
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn", error);
    }
  };

  return (
    <div className="p-5">
      <h3 className="text-2xl font-bold mb-4">
        Quản lý nghỉ phép (Leave Management)
      </h3>
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">STT</th>
              <th className="p-3">Nhân viên ID</th>
              <th className="p-3">Loại nghỉ</th>
              <th className="p-3">Từ ngày - Đến ngày</th>
              <th className="p-3">Lý do</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr key={leave._id} className="border-b">
                  <td className="p-3">{index + 1}</td>
                  {/* Hiển thị tên nhân viên nếu đã populate, hoặc hiển thị ID */}
                  <td className="p-3">
                    {leave.employeeId?.userId?.name ||
                      leave.employeeId?._id ||
                      "N/A"}
                  </td>
                  <td className="p-3">{leave.leaveType}</td>
                  <td className="p-3">
                    {leave.startDate?.split("T")[0]} đến{" "}
                    {leave.endDate?.split("T")[0]}
                  </td>
                  <td className="p-3">{leave.reason}</td>
                  <td className="p-3 font-semibold">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    {leave.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => changeStatus(leave._id, "Approved")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => changeStatus(leave._id, "Rejected")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Từ chối
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500 italic text-sm">
                        Đã xử lý
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  Không có đơn nghỉ phép nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
