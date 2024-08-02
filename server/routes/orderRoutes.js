const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { productId } = req.body;

  try {
    // Create a new order
    const newOrder = new Order({
      ownedBy: req.user.id, // The user who owns the cart (the one who added the product)
      elementId: productId,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

router.get('/', auth, async (req, res) => {
    try {
      const orders = await Order.find({ ownedBy: req.user.id }).populate('elementId');
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });

  router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { linkedTo, address, phoneNo, pincode } = req.body;
  
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      if (order.ownedBy.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      order.linkedTo = linkedTo || order.linkedTo;
      order.address = address || order.address;
      order.phoneNo = phoneNo || order.phoneNo;
      order.pincode = pincode || order.pincode;
      order.isSet = !!linkedTo;
  
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Error updating order' });
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      if (order.ownedBy.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      await order.deleteOne();
      res.json({ message: 'Order removed successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Error deleting order' });
    }
  });
  
  module.exports = router;
    

module.exports = router;
