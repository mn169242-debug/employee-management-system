import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../until/DepartmentHelp";
import axios from "axios";

const DeparmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  useEffect(() => {
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
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons Id={dep._id} />,
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchDepartments();
  }, []);

  const handleFilter = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      <div className="p-5">
        <div className="text-center">
          <h3 className="text-3xl font-bold">Department Management</h3>
        </div>
        <div className="flex justify-between items-center my-4">
          <input
            type="text"
            placeholder="Search By Dep Name"
            onChange={handleFilter}
            className="px-4 py-0.5 border rounded"
          />
          <Link
            to="/admin-dashboard/add-department"
            className="px-4 py-1 bg-teal-600 text-white rounded"
          >
            Add New Department
          </Link>
        </div>
        <div>
          <DataTable columns={columns} data={filteredDepartments} pagination />
        </div>
      </div>
    </>
  );
};

export default DeparmentList;
