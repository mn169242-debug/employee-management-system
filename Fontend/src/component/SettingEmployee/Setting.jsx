import React, { useState } from "react";
import axios from "axios"; // Đảm bảo đã import axios

const Setting = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    theme: "light",
    emailNotifications: true,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        return;
      }

      // Gọi API trực tiếp không cần nối đuôi ID trên URL nữa
      const response = await axios.put(
        "http://localhost:5000/api/employee/change-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setMessage("Đổi mật khẩu thành công!");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
          theme: formData.theme,
          emailNotifications: formData.emailNotifications,
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Có lỗi xảy ra khi cập nhật mật khẩu.",
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Cài đặt tài khoản & Hệ thống
      </h2>

      {/* Hiển thị thông báo thành công */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm font-medium">
          {message}
        </div>
      )}

      {/* Hiển thị thông báo lỗi */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Phần Đổi mật khẩu */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Đổi mật khẩu
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Mật khẩu cũ
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu hiện tại"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu mới"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu mới"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Phần Tùy chọn hệ thống */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Tùy chọn hiển thị & Thông báo
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Giao diện
              </label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              >
                <option value="light">Sáng (Light Mode)</option>
                <option value="dark">Tối (Dark Mode)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label className="text-sm text-gray-700">
                Nhận thông báo hệ thống qua Email
              </label>
            </div>
          </div>
        </div>

        {/* Nút lưu */}
        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
