import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import ProductProvider from './context/ProductContext';

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
