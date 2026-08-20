import React from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import AdminSlidebar from "../component/AdminDashboard/AdminSlidebar";
import Navbar from "../component/AdminDashboard/NaBar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const Navigate = useNavigate();

  if (loading) {
    return <div>Loading....</div>;
  }
  if (!user) {
    Navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSlidebar />

      {/* Sửa lại các class ở đây: Bỏ h-screen, thay bằng min-h-screen, flex flex-col và overflow-x-hidden */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
        <Navbar />

        {/* Phần chứa form Add Employee sẽ tự động co giãn và tạo thanh cuộn chuẩn */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
