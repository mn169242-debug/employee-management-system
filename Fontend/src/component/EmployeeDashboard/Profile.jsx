import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import {
  FaUser,
  FaBuilding,
  FaBriefcase,
  FaRing,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const targetId = id || user?._id || user?.id;

        if (!targetId) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `import.meta.env.VITE_API_URL || 'http://localhost:5000/api/employee/${targetId}`,
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

    if (id || user) {
      fetchEmployee();
    }
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center mt-10 text-gray-500 font-medium">
        No employee data found.
      </div>
    );
  }

  const handleBack = () => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard/employees");
    } else {
      navigate("/employee-dashboard");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-6 text-white flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-wide">
          {user?.role === "admin"
            ? "Employee Details Profile"
            : "My Personal Profile"}
        </h2>
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* Main Content */}
      <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            {employee.image ? (
              <img
                src={`import.meta.env.VITE_API_URL || 'http://localhost:5000/uploads/${employee.image}`}
                alt={employee.name}
                className="w-44 h-44 rounded-full object-cover border-4 border-teal-500 shadow-lg"
              />
            ) : (
              <div className="w-44 h-44 rounded-full bg-gray-200 flex items-center justify-center text-teal-600 text-6xl border-4 border-teal-500 shadow-lg">
                <FaUser />
              </div>
            )}
          </div>
          <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold uppercase tracking-wider border border-teal-200">
            {employee.userId?.role || user?.role || "Employee"}
          </span>
        </div>

        {/* Details Grid Info */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start space-x-3">
            <div className="text-teal-600 text-xl mt-1">
              <FaUser />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Full Name
              </p>
              <p className="text-gray-800 font-bold text-lg">{employee.name}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start space-x-3">
            <div className="text-teal-600 text-xl mt-1">
              <FaBuilding />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Department
              </p>
              <p className="text-gray-800 font-bold text-lg">
                {employee.department ? employee.department.dep_name : "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start space-x-3">
            <div className="text-teal-600 text-xl mt-1">
              <FaBriefcase />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Designation
              </p>
              <p className="text-gray-800 font-bold text-lg">
                {employee.designation || "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start space-x-3">
            <div className="text-teal-600 text-xl mt-1">
              <FaRing />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Marital Status
              </p>
              <p className="text-gray-800 font-bold text-lg">
                {employee.maritalStatus || "N/A"}
              </p>
            </div>
          </div>

          <div className="sm:col-span-2 bg-teal-50/50 p-4 rounded-xl border border-teal-100 flex items-start space-x-3">
            <div className="text-teal-600 text-xl mt-1">
              <FaMoneyBillWave />
            </div>
            <div>
              <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">
                Salary
              </p>
              <p className="text-teal-900 font-extrabold text-xl">
                {employee.salary
                  ? employee.salary.toLocaleString() + " VNĐ"
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
