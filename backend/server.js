const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
// Cart will be handled via local storage on frontend roughly, but if we want server side cart:
const cartRoutes = require('./routes/cart');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('Amazon Clone API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
