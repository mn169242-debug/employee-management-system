import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex items-center space-x-4 border border-gray-100">
        {/* Khung chứa Icon với kích thước và hiệu ứng nổi bật */}
        <div
          className={`p-4 rounded-xl text-white text-2xl flex items-center justify-center shadow-md ${color}`}
        >
          {icon}
        </div>

        {/* Phần thông tin tiêu đề và số liệu */}
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {text}
          </p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{number}</p>
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
