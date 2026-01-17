import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

function Checkout() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real form, we would collect these values from inputs
    const shippingAddress = "123 Test St, NY"; 
    
    try {
        const response = await axios.post(`${API_URL}/api/orders`, {
            items: cart,
            totalAmount: total,
            shippingAddress
        });
        
        setOrderId(response.data.orderId);
        setOrderPlaced(true);
        dispatch({ type: "CLEAR_CART" });
    } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
    }
  };

  if (orderPlaced) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
             <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                 <h2 className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
                 <p className="mb-4">Your Order ID is: <span className="font-bold">#{orderId}</span></p>
                 <p className="text-gray-600 mb-6">Redirecting to home...</p>
                 <button onClick={() => navigate('/')} className="px-4 py-2 bg-amazon_yellow rounded-md">Go to Home</button>
             </div>
        </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
         <div className="max-w-screen-lg mx-auto">
             <Link to="/cart" className="text-sm text-gray-600 hover:text-black mb-4 inline-block hover:underline">
                &larr; Back to Cart
             </Link>
             <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-4">
                 <Link to="/">
                    <span className="text-2xl font-bold tracking-tighter cursor-pointer">amazon.in</span>
                 </Link>
                 <h1 className="text-2xl font-medium">Checkout (<Link to="/cart" className="text-blue-600 hover:underline">{totalItems} items</Link>)</h1>
                 <div className="w-8"></div> {/* Spacer */}
             </div>
             
             <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow">
                     <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                         {/* Address Section */}
                         <div className="bg-white p-4 rounded-md shadow-sm">
                             <h3 className="font-bold text-lg mb-4 text-[#c7511f]">1. Shipping Address</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="flex flex-col">
                                     <label className="text-sm font-bold mb-1">Full Name</label>
                                     <input required className="border border-gray-400 p-2 rounded-sm focus:ring-2 focus:ring-[#e77600] outline-none" type="text"/>
                                 </div>
                                 <div className="flex flex-col">
                                     <label className="text-sm font-bold mb-1">Mobile number</label>
                                     <input required className="border border-gray-400 p-2 rounded-sm focus:ring-2 focus:ring-[#e77600] outline-none" type="tel"/>
                                 </div>
                                 <div className="flex flex-col md:col-span-2">
                                     <label className="text-sm font-bold mb-1">Address Line 1</label>
                                     <input required className="border border-gray-400 p-2 rounded-sm focus:ring-2 focus:ring-[#e77600] outline-none" type="text"/>
                                 </div>
                                  <div className="flex flex-col md:col-span-2">
                                     <label className="text-sm font-bold mb-1">Address Line 2</label>
                                     <input className="border border-gray-400 p-2 rounded-sm focus:ring-2 focus:ring-[#e77600] outline-none" type="text"/>
                                 </div>
                                 <div className="flex flex-col">
                                     <label className="text-sm font-bold mb-1">City</label>
                                     <input required className="border border-gray-400 p-2 rounded-sm focus:ring-2 focus:ring-[#e77600] outline-none" type="text"/>
                                 </div>
                                  <div className="flex flex-col">
                                     <label className="text-sm font-bold mb-1">State</label>
                                     <input required className="border border-gray-400 p-2 rounded-sm focus:ring-2 focus:ring-[#e77600] outline-none" type="text"/>
                                 </div>
                                  <div className="flex flex-col">
                                     <label className="text-sm font-bold mb-1">ZIP / Postal Code</label>
                                     <input required className="border border-gray-400 p-2 rounded-sm focus:ring-2 focus:ring-[#e77600] outline-none" type="text"/>
                                 </div>
                             </div>
                         </div>
                         
                         {/* Payment Section - Simple mock */}
                         <div className="bg-white p-4 rounded-md shadow-sm">
                              <h3 className="font-bold text-lg mb-4 text-[#c7511f]">2. Payment Method</h3>
                              <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                      <input type="radio" name="payment" id="card" defaultChecked />
                                      <label htmlFor="card" className="text-sm font-bold">Credit or Debit Card</label>
                                  </div>
                                   <div className="flex items-center gap-2">
                                      <input type="radio" name="payment" id="cod" />
                                      <label htmlFor="cod" className="text-sm font-bold">Cash on Delivery / Pay on Delivery</label>
                                  </div>
                              </div>
                         </div>

                          <div className="bg-white p-4 rounded-md shadow-sm md:hidden">
                             <button type="submit" className="w-full bg-amazon_yellow border border-yellow-500 rounded-lg py-2 shadow-sm hover:bg-[#f3a847]">Place your order</button>
                         </div>
                     </form>
                </div>
                
                {/* Order Summary Sidebar */}
                <div className="md:w-1/3">
                    <div className="bg-white p-4 rounded-md shadow-sm sticky top-4 border border-gray-200">
                        <button form="checkout-form" type="submit" className="w-full bg-amazon_yellow border border-yellow-500 rounded-lg py-2 shadow-sm hover:bg-[#f3a847] text-sm mb-4">Place your order</button>
                        
                        <h3 className="font-bold text-lg mb-2">Order Summary</h3>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Items:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Shipping & handling:</span>
                            <span>$0.00</span>
                        </div>
                         <div className="flex justify-between text-sm mb-1 border-b border-gray-200 pb-2">
                            <span>Total before tax:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between text-xl font-bold text-[#B12704] mt-2">
                            <span>Order Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
             </div>
         </div>
    </div>
  );
}

export default Checkout;
