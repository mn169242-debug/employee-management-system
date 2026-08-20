import React from "react";
import { NavLink } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaSignOutAlt,
  FaMoneyBill,
} from "react-icons/fa";

const AdminSlidebar = () => {
  return (
    <>
      {/* Đổi h-screen thành min-h-screen ở đây */}
      <div className="bg-gray-800 text-white min-h-screen left-0 top-0 bottom-0 space-y-2 w-64">
        <div className="bg-green-600 h-12 flex items-center justify-center">
          <h3 className="text-2xl text-center">Empolyee MS</h3>
        </div>

        <div className="px-4">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500 text-white" : " "
              }flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
            end
          >
            <FaTachometerAlt />
            <span>DashBoard</span>
          </NavLink>

          <NavLink
            to={"/admin-dashboard/employees"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500 text-white" : " "
              }flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
            end
          >
            <FaUsers />
            <span>Employees</span>
          </NavLink>

          <NavLink
            to={"/admin-dashboard/department"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500 text-white" : " "
              }flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
            end
          >
            <FaBuilding />
            <span>Deparment</span>
          </NavLink>

          <NavLink
            to={"/admin-dashboard"}
            className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          >
            <FaSignOutAlt />
            <span>Leaves</span>
          </NavLink>

          <NavLink
            to={"/admin-dashboard/salaries"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500 text-white" : " "
              }flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
            end
          >
            <FaMoneyBill />
            <span>Salary</span>
          </NavLink>

          <NavLink
            to={"/admin-dashboard"}
            className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          >
            <IoSettings />
            <span>Setting</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSlidebar;
