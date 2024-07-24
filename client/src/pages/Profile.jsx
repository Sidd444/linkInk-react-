import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, fetchProducts } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const getProducts = async () => {
        try {
          const userProducts = await fetchProducts();
          setProducts(userProducts);
        } catch (error) {
          console.error("Failed to fetch products", error);
        }
      };
      getProducts();
    }
  }, [user, navigate, fetchProducts]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Profile</h2>
        {user ? (
          <div className="space-y-4">
            <p className="text-white">Full name: {user.name}</p>
            <p className="text-white">Email: {user.email}</p>
            <h3 className="text-xl font-bold text-white">Products:</h3>
            {products.length > 0 ? (
              <ul className="list-disc pl-5 text-white">
                {products.map((product) => (
                  <li key={product.id}>
                    {product.name} - {product.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No products added.</p>
            )}
          </div>
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
