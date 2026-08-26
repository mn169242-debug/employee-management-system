import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: "",
    department: "",
  });
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Lấy danh sách phòng ban cho dropdown
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "import.meta.env.VITE_API_URL || 'http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          setDepartments(response.data.departments);
        }
      } catch (error) {
        alert("Error fetching departments");
      }
    };
    fetchDepartments();

    // 2. Lấy thông tin nhân viên cũ theo ID để điền vào form
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `import.meta.env.VITE_API_URL || 'http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee({
            name: emp.name || "",
            maritalStatus: emp.maritalStatus || "",
            designation: emp.designation || "",
            salary: emp.salary || "",
            department: emp.department
              ? emp.department._id || emp.department
              : "",
          });
        }
      } catch (error) {
        alert("Error fetching employee details");
      }
    };
    fetchEmployee();
  }, [id]);

  // Xử lý lưu thông tin khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `import.meta.env.VITE_API_URL || 'http://localhost:5000/api/employee/${id}`,
        employee,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (response.data.success) {
        alert("Employee updated successfully");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      alert("Error updating employee");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow">
      <h3 className="text-2xl font-bold mb-6">Edit Employee</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              value={employee.maritalStatus}
              onChange={(e) =>
                setEmployee({ ...employee, maritalStatus: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              value={employee.designation}
              onChange={(e) =>
                setEmployee({ ...employee, designation: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              value={employee.department}
              onChange={(e) =>
                setEmployee({ ...employee, department: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
