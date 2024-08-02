const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const auth = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

router.post('/', auth, async (req, res) => {
  const { image, description, title } = req.body;
  console.log('Request Body:', req.body);
  console.log('Authenticated User:', req.user);

  
  const userId = req.user ? req.user.id : null;


  if (!image || !description || !title || !userId) {
    console.log('Missing fields:', { image, description, title, userId });
    return res.status(400).json({ message: 'All fields are required, including user' });
  }

  try {
    
    const newProduct = new Product({ image, description, title, user: userId });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error); // Log the exact error
    res.status(500).json({ message: 'Error adding product', error });
  }
});


router.delete('/:id', auth, async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await product.deleteOne(); 
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});








module.exports = router;
