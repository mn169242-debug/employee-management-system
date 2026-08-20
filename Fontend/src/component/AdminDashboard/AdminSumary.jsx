import React from "react";
import SummaryCard from "./Sumary";
import { FaUsers, FaTachometerAlt, FaMoneyBill } from "react-icons/fa"; // Sửa thành FaUsers cho khớp
import { FcApprove, FcDisapprove } from "react-icons/fc";
const AdminSumary = () => {
  return (
    <>
      <div className="p-6">
        <h3 className="text-2xl font-bold">DashBoard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <SummaryCard
            icon={<FaUsers />}
            text="Total Employees"
            number={13}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaTachometerAlt />}
            text="Total Department"
            number={5}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaMoneyBill />}
            text="Total Employees"
            number="$2500"
            color="bg-blue-600"
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-3xl font-bold text-center pb-4">Leave Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SummaryCard
            icon={<FaMoneyBill />}
            text="Leave Applied"
            number={2}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FcApprove />}
            text="Leave Approved"
            number={2}
            color="bg-green-500"
          />
          <SummaryCard
            icon={<FaMoneyBill />}
            text="Leave Pending"
            number={1}
            color="bg-yellow-500"
          />
          <SummaryCard
            icon={<FcDisapprove />}
            text="Leave Rejected"
            number={2}
            color="bg-red-600"
          />
        </div>
      </div>
    </>
  );
};

export default AdminSumary;
