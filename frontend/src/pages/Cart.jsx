import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function Cart() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };
  
  const updateQuantity = (id, newQty) => {
     if(newQty > 0)
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQty } });
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">
        
        {/* Cart Items Section */}
        <div className="flex-grow bg-white p-4 shadow-sm">
          <h2 className="text-2xl font-medium border-b pb-4 mb-4">Shopping Cart</h2>
          
          {cart.length === 0 ? (
            <div className="p-4 text-center">
                <h2>Your Amazon Cart is empty.</h2>
                <Link to="/" className="text-blue-500 hover:underline text-sm">Shop today's deals</Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row border-b py-4 gap-4">
                 <div className="min-w-[150px] flex justify-center">
                    <img src={item.image} alt={item.title} className="h-32 object-contain" />
                 </div>
                 
                 <div className="flex-grow">
                    <Link to={`/product/${item.id}`} className="font-medium text-lg hover:text-[#c7511f] line-clamp-2">
                        {item.title}
                    </Link>
                    <p className="text-xs text-green-700 my-1">In Stock</p>
                    <p className="text-xs text-gray-500">Eligible for FREE Shipping</p>
                    <div className="flex items-center text-xs gap-1 mt-1 font-bold">
                        <img src="https://m.media-amazon.com/images/G/31/marketing/prime/Prime_icon_pixel._CB485926526_.gif" className="h-4" alt="Prime" />
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center border border-gray-300 rounded-md bg-[#F0F2F2] shadow-sm">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-l-md border-r border-gray-300">-</button>
                            <span className="px-3 bg-white font-medium text-amazon_blue-DEFAULT">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-r-md border-l border-gray-300">+</button>
                        </div>
                        <span className="text-gray-300">|</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-blue-600 hover:underline">Delete</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-blue-600 hover:underline">Save for later</button>
                    </div>
                 </div>

                 <div className="text-right font-bold text-lg w-32">
                    ${(item.price * item.quantity).toFixed(2)}
                 </div>
              </div>
            ))
          )}
          
           {cart.length > 0 && (
             <div className="text-right text-lg py-2">
                Subtotal ({totalItems} items): <span className="font-bold">${total.toFixed(2)}</span>
             </div>
           )}
        </div>

        {/* Checkout Sidebar */}
        {cart.length > 0 && (
            <div className="flex-col bg-white p-4 shadow-sm h-fit min-w-[300px]">
                <div className="flex items-center gap-1 text-xs text-green-700 mb-2">
                    <FaCheckCircle />
                    <span>Part of your order qualifies for FREE Delivery.</span>
                </div>
                <h3 className="text-lg">
                    Subtotal ({totalItems} items): <span className="font-bold">${total.toFixed(2)}</span>
                </h3>
                <div className="my-2 flex items-center gap-1">
                    <input type="checkbox" />
                    <span className="text-sm">This order contains a gift</span>
                </div>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-amazon_yellow border border-yellow-500 rounded-lg py-2 my-2 text-sm shadow-sm hover:bg-[#f3a847]"
                >
                    Proceed to Checkout
                </button>
            </div>
        )}

      </div>
    </div>
  );
}

export default Cart;
