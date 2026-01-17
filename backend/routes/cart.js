const express = require('express');
const router = express.Router();

let cart = []; // Mock in-memory cart

// Get cart for a user
router.get('/:userId', (req, res) => {
    res.json(cart);
});

// Add item to cart
router.post('/', (req, res) => {
    // Implement mock add if needed, or just acknowledge
    res.status(200).json({ message: 'Added to cart' });
});

module.exports = router;
