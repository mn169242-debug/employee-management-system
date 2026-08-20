import React from "react";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  // 1. In giá trị của user ra F12 (Console) trên trình duyệt để kiểm tra
  console.log("Giá trị của user hiện tại:", user);
  console.log("Trạng thái loading:", loading);

  // 2. Nếu đang tải, hiển thị chữ Loading
  if (loading) {
    return <div>Loading....</div>;
  }

  // 3. Nếu có user thì cho phép hiển thị trang con, ngược lại đá về trang login
  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoutes;
