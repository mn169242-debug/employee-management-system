import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không trùng khớp");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user._id : null;

      // Lấy token từ localStorage
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "import.meta.env.VITE_API_URL || 'http://localhost:5000/api/setting/change-password",
        {
          userId: userId,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setSuccess("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        setError(null);
        setTimeout(() => {
          localStorage.clear();
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Có lỗi xảy ra khi đổi mật khẩu");
      setSuccess(null);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Cài đặt tài khoản Admin
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Mật khẩu cũ
          </label>
          <input
            type="password"
            placeholder="Nhập mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-teal-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Mật khẩu mới
          </label>
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-teal-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Xác nhận mật khẩu mới
          </label>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-teal-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200 font-semibold"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default Setting;
