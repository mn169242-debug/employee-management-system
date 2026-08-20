import React from "react";
import { useAuth } from "../contexts/authContext"; // Hoặc '../contexts/authContext' tùy dự án của bạn
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  // 1. Đang tải dữ liệu xác thực
  if (loading) {
    return <div>Loading ...</div>;
  }

  // 2. Chưa đăng nhập -> Đá về login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 3. Kiểm tra an toàn xem có truyền requiredRole hay không và user có role không
  if (!requiredRole || !user.role) {
    return <Navigate to="/unauthorized" />;
  }

  // 4. Kiểm tra phân quyền an toàn (hỗ trợ cả dạng chuỗi hoặc mảng)
  const isAuthorized = Array.isArray(requiredRole)
    ? requiredRole.includes(user.role)
    : requiredRole === user.role;

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" />;
  }

  // 5. Thỏa mãn tất cả điều kiện -> Cho phép hiển thị trang
  return children;
};

export default RoleBaseRoutes;
