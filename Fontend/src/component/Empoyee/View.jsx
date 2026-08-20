import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
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
        alert("Error fetching employee details");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading || !employee) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Employee Details</h2>

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
          onClick={() => navigate("/admin-dashboard/employees")}
          className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default View;
