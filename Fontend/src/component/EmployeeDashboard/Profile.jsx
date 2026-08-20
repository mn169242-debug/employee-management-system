import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

const Profile = () => {
  const { id } = useParams(); // Lấy id từ URL (nếu có)
  const { user } = useAuth(); // Lấy thông tin user hiện tại đang đăng nhập
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        // Lấy chính xác id từ URL trước, nếu không có mới lấy từ user đang đăng nhập
        const targetId = id || user?._id || user?.id;

        console.log("ID đang được dùng để gọi API:", targetId); // In ra F12 xem có ra giá trị không

        if (!targetId) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/employee/${targetId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.error("Lỗi khi fetch:", error);
        alert("Error fetching employee details");
      } finally {
        setLoading(false);
      }
    };

    // Gọi hàm fetch khi đã có user hoặc có id trên URL
    if (id || user) {
      fetchEmployee();
    }
  }, [id, user]);

  if (loading || !employee) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Xử lý nút Back thông minh dựa vào quyền hoặc trang trước đó
  const handleBack = () => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard/employees");
    } else {
      navigate("/employee-dashboard");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {user?.role === "admin" ? "Employee Details" : "My Profile"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Ảnh đại diện */}
        <div className="flex justify-center">
          <img
            src={`http://localhost:5000/uploads/${employee.image}`}
            alt={employee.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-teal-600 shadow"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex space-x-3">
            <p className="font-semibold w-32">Name:</p>
            <p>{employee.name}</p>
          </div>
          <div className="flex space-x-3">
            <p className="font-semibold w-32">Department:</p>
            <p>{employee.department ? employee.department.dep_name : "N/A"}</p>
          </div>
          <div className="flex space-x-3">
            <p className="font-semibold w-32">Designation:</p>
            <p>{employee.designation || "N/A"}</p>
          </div>
          <div className="flex space-x-3">
            <p className="font-semibold w-32">Marital Status:</p>
            <p>{employee.maritalStatus || "N/A"}</p>
          </div>
          <div className="flex space-x-3">
            <p className="font-semibold w-32">Salary:</p>
            <p>{employee.salary}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
        >
          {user?.role === "admin" ? "Back to List" : "Back to Dashboard"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
