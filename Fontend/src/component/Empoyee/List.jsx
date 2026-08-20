import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Gọi API lấy danh sách nhân viên
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setEmployees(response.data.employees);
          setFilteredEmployees(response.data.employees);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("Error fetching employees");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Đưa hàm handleDelete vào TRONG component List để nhận diện được setEmployees & setFilteredEmployees
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this employee?",
    );
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          setEmployees(employees.filter((emp) => emp._id !== id));
          setFilteredEmployees(
            filteredEmployees.filter((emp) => emp._id !== id),
          );
          alert("Employee deleted successfully");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("Server error occurred");
        }
      }
    }
  };

  // Cấu hình columns đặt trong này để gọi được hàm handleDelete
  const columns = [
    {
      name: "S/N",
      cell: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={`http://localhost:5000/uploads/${row.image}`}
          alt={row.name}
          className="w-10 h-10 rounded-full object-cover my-1"
        />
      ),
    },
    {
      name: "Department",
      selector: (row) => (row.department ? row.department.dep_name : "N/A"),
      sortable: true,
      width: "200px",
    },
    {
      name: "DOB",
      selector: (row) =>
        row.dob ? new Date(row.dob).toLocaleDateString() : "",
      sortable: true,
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Link
            to={`/admin-dashboard/employees/${row._id}`}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
          >
            View
          </Link>
          <Link
            to={`/admin-dashboard/edit-employee/${row._id}`}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs flex items-center"
          >
            Edit
          </Link>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "250px",
    },
  ];

  // Xử lý tìm kiếm nhân viên theo tên
  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold">Employees Management</h3>
      </div>

      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Name"
          onChange={handleFilter}
          className="px-4 py-2 border rounded-md"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
        >
          Add New Employee
        </Link>
      </div>

      {/* Hiển thị DataTable */}
      <div className="mt-6 bg-white rounded-md shadow">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          progressPending={loading}
        />
      </div>
    </div>
  );
};

export default List;
