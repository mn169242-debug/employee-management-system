import React, { Children, useContext, useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios";
const userContext = createContext();
const authContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth/verify",
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUSer(null);
          setLoading(false);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setUser(null);
        } else {
          setError("Error Server");
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <>
      <userContext.Provider value={{ user, login, logout, loading }}>
        {children}
      </userContext.Provider>
    </>
  );
};
export const useAuth = () => useContext(userContext);
export default authContext;
