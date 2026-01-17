const express = require('express');
const router = express.Router();
// const db = require('../db'); // Commented out DB

// Mock Data
const products = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "bags",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      rating: { rate: 3.9, count: 120 }
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
      category: "men's clothing",
      image: "https://m.media-amazon.com/images/I/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.1, count: 259 }
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
      category: "men's clothing",
      image: "https://m.media-amazon.com/images/I/71li-ujtlUL._AC_UX679_.jpg",
      rating: { rate: 4.7, count: 500 }
    },
    {
       id: 4,
       title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
       price: 999.99,
       description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
       category: "electronics",
       image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
       rating: { rate: 2.2, count: 140 }
    },
     {
        id: 5,
        title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
        price: 114,
        description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
        category: "electronics",
        image: "https://m.media-amazon.com/images/I/61mtL65D4cL._AC_SX679_.jpg",
        rating: { rate: 4.8, count: 400 }
     },
     {
         id: 6,
         title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
         price: 599,
         description: "21. 5 inches Full HD (1920 x 1080) widescreen IPS display. And Radeon free sync technology. No compatibility for VESA Mount. Refresh Rate: 75Hz - Using HDMI port. Zero-frame design | ultra-thin | 4ms response time | IPS panel. Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit. Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree. 75 hertz",
         category: "electronics",
         image: "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SX679_.jpg",
         rating: { rate: 2.9, count: 250 }
     }
];

// Get all products with filtering and search
router.get('/', (req, res) => {
    console.log('GET /api/products query:', req.query);
    let result = products;
    const { category, search } = req.query;

    if (category && category !== 'All') {
        const catLower = category.toLowerCase();
        result = result.filter(p => p.category && p.category.toLowerCase() === catLower);
    }

    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(p => 
            (p.title && p.title.toLowerCase().includes(searchLower)) || 
            (p.description && p.description.toLowerCase().includes(searchLower)) ||
            (p.category && p.category.toLowerCase().includes(searchLower))
        );
    }
    
    console.log(`Returning ${result.length} products`);
    res.json(result);
});

// Get product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;
