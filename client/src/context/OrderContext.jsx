import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const addOrder = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, user might not be logged in');
        return;
      }
      console.log('Token:', token); 
  
      const response = await axios.post(
        'http://localhost:5000/api/orders',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      setOrders([...orders, response.data]);
    } catch (error) {
      console.error('Error adding order:', error.response ? error.response.data : error);
    }
  };
  
  
  

  const updateOrder = async (orderId, updates) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, updates);
      setOrders(
        orders.map(order =>
          order._id === orderId ? response.data : order
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
