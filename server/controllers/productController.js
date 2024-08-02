const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");


const addProduct = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const product = new Product({
    user: req.user.id,
    name,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});


const getUserProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id });
  res.json(products);
});

module.exports = {
  addProduct,
  getUserProducts,
};
