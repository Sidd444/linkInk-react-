const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const auth = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'name email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Add a new product
router.post('/', auth, async (req, res) => {
  const { image, description, title, user } = req.body;

  try {
    const newProduct = new Product({ image, description, title, user });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

module.exports = router;
