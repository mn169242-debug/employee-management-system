import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

export default function SalaryList() {
  const [salaries, setSalaries] = useState([]); // Khởi tạo giá trị mặc định là mảng rỗng
  const { user } = useAuth();

  const fetchSalaries = async () => {
    try {
      if (!user || !user._id) return;
      const response = await axios.get(
        `import.meta.env.VITE_API_URL || 'http://localhost:5000/api/salary/${user._id}`,
      );
      if (response.data.success) {
        // Hỗ trợ cả 2 trường hợp tên biến trả về từ backend
        setSalaries(response.data.salaries || response.data.salary || []);
      }
    } catch (error) {
      console.error("Lỗi khi tải lịch sử lương:", error);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, [user]);

  // Đảm bảo salaries luôn là mảng an toàn trước khi dùng .length hay .map
  const salaryList = Array.isArray(salaries) ? salaries : [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Lịch sử lương</h3>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600">
              <th className="p-4">STT</th>
              <th className="p-4">Tháng/Năm</th>
              <th className="p-4">Lương cơ bản</th>
              <th className="p-4">Phụ cấp</th>
              <th className="p-4">Khấu trừ</th>
              <th className="p-4">Thực nhận</th>
            </tr>
          </thead>
          <tbody>
            {salaryList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-400">
                  Chưa có thông tin lương nào.
                </td>
              </tr>
            ) : (
              salaryList.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">
                    {item.month}/{item.year}
                  </td>
                  <td className="p-4">{item.baseSalary?.toLocaleString()} đ</td>
                  <td className="p-4">{item.allowance?.toLocaleString()} đ</td>
                  <td className="p-4">{item.deduction?.toLocaleString()} đ</td>
                  <td className="p-4 font-semibold text-green-600">
                    {/* Tính tổng thực nhận nếu model của bạn chưa lưu sẵn netSalary */}
                    {(
                      (item.baseSalary || 0) +
                      (item.allowance || 0) +
                      (item.bonus || 0) -
                      (item.deduction || 0)
                    ).toLocaleString()}{" "}
                    đ
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
