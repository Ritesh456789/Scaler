const express = require('express');
const router = express.Router();

let orders = [];

// Place an order
router.post('/', (req, res) => {
    const { items, shippingAddress, totalAmount } = req.body;
    
    const newOrder = {
        id: Math.floor(Math.random() * 1000000),
        items,
        shippingAddress,
        totalAmount,
        status: 'placed',
        createdAt: new Date()
    };
    
    orders.push(newOrder);
    
    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.id });
});

// Get all orders (for admin or user history)
router.get('/', (req, res) => {
    res.json(orders);
});

module.exports = router;
