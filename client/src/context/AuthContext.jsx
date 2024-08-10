import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import SERVER_URL from '../config/config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(`${SERVER_URL}/api/users/me`)
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      `${SERVER_URL}/api/users/login`,
      {
        email,
        password,
      }
    );
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    const userRes = await axios.get(
      `${SERVER_URL}/api/users/me`
    );
    setUser(userRes.data);
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(
        `${SERVER_URL}/api/users/signup`,
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      const userRes = await axios.get(
        `${SERVER_URL}/api/users/me`
      );
      setUser(userRes.data);
    } catch (error) {
      throw error.response.data;
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/users/products`);
      return res.data;
    } catch (error) {
      console.error("Error fetching products", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, fetchProducts, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
