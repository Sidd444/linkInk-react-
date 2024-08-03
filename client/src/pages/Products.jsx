import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext'; 
import { toast } from 'react-hot-toast';

const Products = () => {
  const { products, addProduct, deleteProduct } = useContext(ProductContext);
  const { addOrder } = useContext(OrderContext); 
  const { user } = useContext(AuthContext);
  const [newProduct, setNewProduct] = useState({
    image: '',
    description: '',
    title: ''
  });

  const handleAddProduct = async () => {
    if (!user) {
      toast.error('You need to be logged in to add a product');
      return;
    }

    if (!newProduct.image || !newProduct.title || !newProduct.description) {
      toast.error('All fields are required');
      return;
    }

    try {
      await addProduct({ ...newProduct, user: user._id });
      toast.success('Product added successfully!');
      setNewProduct({ image: '', description: '', title: '' });
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleAddToCart = async (productId, ownerId) => {
    if (!user) {
      toast.error('You need to be logged in to add a product to the cart');
      return;
    }

    if (!productId || typeof productId !== 'string') {
      toast.error('Invalid product ID');
      return;
    }

    try {
      await addOrder(productId); // Pass only the productId as per the backend expectation
      toast.success('Product added to cart!');
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 mt-12">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Product</h2>
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="w-full mb-4 px-4 py-2 text-gray-900 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="w-full mb-4 px-4 py-2 text-gray-900 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="w-full mb-4 px-4 py-2 text-gray-900 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddProduct}
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
        >
          Add Product
        </button>
      </div>

      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Products List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold text-white">{product.title}</h3>
              <p className="text-gray-400">{product.description}</p>
              {user && (
                <div className="flex space-x-4 mt-4">
                  {user._id === product.user && (
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    onClick={() => handleAddToCart(product._id, product.user)}
                    className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-500"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
