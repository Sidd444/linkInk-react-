import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { OrderContext } from "../context/OrderContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { fetchOrdersByUser } = useContext(OrderContext); // Fetch orders by the current user
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const getOrders = async () => {
        try {
          const userOrders = await fetchOrdersByUser(user._id);
          setOrders(userOrders);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      };
      getOrders();
    }
  }, [user, navigate, fetchOrdersByUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Profile</h2>
        {user ? (
          <div className="space-y-4">
            <p className="text-white">Full name: {user.name}</p>
            <p className="text-white">Email: {user.email}</p>
            <h3 className="text-xl font-bold text-white">Products in Cart:</h3>
            {orders.length > 0 ? (
              <ul className="list-disc pl-5 text-white">
                {orders.map((order) => (
                  <li key={order._id}>
                    Product ID: {order.elementId} - Status: {order.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No products in cart.</p>
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
