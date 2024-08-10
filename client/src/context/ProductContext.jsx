import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../config/config';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/products`, product);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${SERVER_URL}/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
