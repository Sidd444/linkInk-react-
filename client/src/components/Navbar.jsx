import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export function Navbar() {
  const {user}=useContext(AuthContext);
  const[currentUser,setCurrentUser]=useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      try {
        setCurrentUser(JSON.parse(user.fullname));
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-gray-800 p-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-white text-xl font-bold">
          Home
        </Link>
        <div className="flex space-x-4">
          <Link to="/shop" className="text-white">
            Shop Now
          </Link>
          <Link to="/products" className="text-white">
            Products
          </Link>
          <Link to="/about" className="text-white">
            About Us
          </Link>
          <Link to="/contact" className="text-white">
            Contact
          </Link>
          <Link to="/socials" className="text-white">
            Socials
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="text-white font-bold">{user.name}</Link>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
