import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ Id }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn xóa phòng ban này không?",
    );
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          // Tải lại trang hoặc reload lại danh sách
          window.location.reload();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };
  const handleEdit = (id) => {
    navigate(`/admin-dashboard/department/${id}`);
  };
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => handleEdit(Id)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};
