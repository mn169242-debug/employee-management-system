// 1. Sửa lại BrowserRoute thành BrowserRouter
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./until/privateauth.jsx";
import RoleBaseRoutes from "./until/RoleBaseRoutes.jsx";
import AdminSumary from "./component/AdminDashboard/AdminSumary.jsx";
import DeparmentList from "./component/Deparment/DeparmentList.jsx";
import AddDeparment from "./component/Deparment/AddDepartment.jsx";
import Edit from "./component/Deparment/Edit.jsx";
import List from "./component/Empoyee/List.jsx";
import Add from "./component/Empoyee/Add.jsx";
import EditE from "./component/Empoyee/EditE.jsx";
import View from "./component/Empoyee/View.jsx";
import AddSalary from "./component/Salary/Add.jsx";
import SalaryList from "./component/Salary/SalaryList.jsx";
import Summary from "./component/EmployeeDashboard/Sumary.jsx";
import Profile from "./component/EmployeeDashboard/Profile.jsx";
function App() {
  return (
    // 1. Đổi thành BrowserRouter
    <BrowserRouter>
      <Routes>
        {/* 2. Sửa lại cú pháp thành thẻ đóng mở <Navigate to="..." /> */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Các Route con nằm bên trong, tự động nối tiếp path cha */}

          <Route index element={<AdminSumary />} />
          <Route path="department" element={<DeparmentList />} />
          <Route path="add-department" element={<AddDeparment />} />
          <Route path="department/:id" element={<Edit />} />
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="edit-employee/:id" element={<EditE />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="add-salary" element={<AddSalary />} />
          <Route path="salaries" element={<SalaryList />} />
        </Route>

        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Cách 1: Dùng index nếu muốn đây là trang hiển thị mặc định khi vào /employee-dashboard */}
          <Route index element={<Summary />} />

          {/* Hoặc Cách 2: Tạo đường dẫn con cụ thể /employee-dashboard/summary */}

          <Route path="profile/:id?" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
