import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

// Helper component to conditionally render Header
function Layout({ children }) {
    const location = useLocation();
    // Don't show header on checkout
    const showHeader = location.pathname !== '/checkout';
    
    return (
        <div className="flex flex-col min-h-screen">
            {showHeader && <Header />}
            <main className="flex-grow">
                {children}
            </main>
             {/* Simple Footer */}
            <footer className="bg-amazon_blue-light text-white text-center py-4 text-xs mt-auto">
                <div className="mb-2 space-x-4">
                    <span className="cursor-pointer hover:underline">Conditions of Use & Sale</span>
                    <span className="cursor-pointer hover:underline">Privacy Notice</span>
                    <span className="cursor-pointer hover:underline">Interest-Based Ads</span>
                </div>
                <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
            </footer>
        </div>
    );
}

function App() {
  return (
    <CartProvider>
        <Router>
             <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
             </Layout>
        </Router>
    </CartProvider>
  );
}

export default App;
