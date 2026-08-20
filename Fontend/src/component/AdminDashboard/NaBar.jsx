import React from "react";
import { useAuth } from "../../contexts/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <div className="bg-green-600 item-center text-white flex justify-between h-12 px-5">
        <p>Welcome {user.role}</p>
        <button
          className="px-4 py-1 bg-teal-700 hover:bg-teal-800"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};
export default Navbar;
