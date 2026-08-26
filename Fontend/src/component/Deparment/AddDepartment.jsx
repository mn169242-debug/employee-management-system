import React, { useState } from "react"; // Đã thêm useState
import { useNavigate } from "react-router-dom"; // Đã thêm useNavigate
import axios from "axios";
const AddDeparment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };
  const navigate = useNavigate();
  // 3. Hàm xử lý khi bấm nút submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Chặn hành vi load lại trang mặc định của form

    try {
      const response = await axios.post(
        "import.meta.env.VITE_API_URL || 'http://localhost:5000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Gắn token xác thực nếu cần
          },
        },
      );

      if (response.data.success) {
        // Thêm thành công thì điều hướng về trang danh sách phòng ban
        navigate("/admin-dashboard/department");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.error || "Có lỗi xảy ra từ server!");
    }
  };
  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Department
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Input Tên phòng ban */}
          <div className="mb-4">
            <label
              htmlFor="dep_name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              id="dep_name"
              placeholder="Enter Department Name"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Textarea Mô tả */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter Description"
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          {/* Nút Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md font-medium hover:bg-teal-700 transition-colors"
          >
            Add Department
          </button>
        </form>
      </div>
    </>
  );
};
export default AddDeparment;
