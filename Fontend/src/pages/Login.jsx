import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
      );
      if (response.data.success) {
        login(response.data.user); // 👈 Sửa từ response.data.success thành response.data.user
        localStorage.setItem("token", response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Error Server");
      }
    }
  };
  return (
    // 1. Nền tối Gradient & Hiệu ứng trừu tượng (Abstract Background)
    <div className="flex flex-col items-center justify-center min-h-screen font-sans antialiased relative overflow-hidden bg-[#0a0f1e]">
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <h2 className="text-4xl font-extrabold mb-10 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-emerald-200 relative z-10">
        Employee Management System
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 relative z-10 border border-white/5 bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.2)]"
      >
        {/* Nâng cấp hiệu ứng cho tiêu đề Login */}
        <h2 className="text-3xl font-semibold text-center mb-10 tracking-tight text-white">
          Login
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-6 relative group">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider pl-1"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="your_email@company.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
            className="w-full px-5 py-4 border border-white/10 bg-black/30 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 focus:bg-black/50 transition duration-300 shadow-inner"
          />
          {/* Hiệu ứng viền phát sáng khi focus */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-0 group-focus-within:opacity-100 border border-blue-400/30"></div>
        </div>
        {/* Cụm Nhập Password (Tương tự Email) */}
        <div className="mb-10 relative group">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider pl-1"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full px-5 py-4 border border-white/10 bg-black/30 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 focus:bg-black/50 transition duration-300 shadow-inner"
          />
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-0 group-focus-within:opacity-100 border border-blue-400/30"></div>
        </div>
        {/* 🌟 Nút Login (Hiệu ứng Gradient đầy ấn tượng & Micro-interaction) */}
        <button
          type="submit"
          className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-[0_15px_30px_-5px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(59,130,246,0.5)] active:scale-[0.98]"
        >
          Login
        </button>
        {/* Thêm liên kết quên mật khẩu cho UX */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Having trouble?{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition">
            Reset Access
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
