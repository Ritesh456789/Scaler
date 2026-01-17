import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = (e) => { 
     e.preventDefault(); // prevent navigation if clicking "add to cart"
     dispatch({ type: "ADD_TO_CART", payload: product });
     setIsAdded(true);
     setTimeout(() => setIsAdded(false), 2000);
  }

  return (
    <div className="relative flex flex-col m-2 bg-white z-30 p-4 border border-gray-200 rounded-sm hover:shadow-lg transition-shadow bg-opacity-100 backdrop-filter backdrop-blur-lg">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full text-black no-underline">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400 capitalize">{product.category}</p>
        
        <div className="flex justify-center items-center h-52 mb-4 p-2"> 
            <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-200" />
        </div>

        <h4 className="my-2 font-medium line-clamp-2 text-sm hover:text-[#c7511f] transition-colors">{product.title}</h4>

        <div className="flex text-yellow-500 mb-2">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(product.rating?.rate || 4) ? "text-yellow-500" : "text-gray-300"} />
            ))}
             <span className="text-gray-500 text-xs ml-1 flex items-center">{product.rating?.count || 100}</span>
        </div>

        <div className="mb-2">
            <span className="text-xs align-top font-bold">$</span>
            <span className="text-2xl font-bold">{Math.floor(product.price)}</span>
            <span className="text-xs align-top font-bold">{(product.price % 1).toFixed(2).substring(1)}</span>
        </div>

        <p className="text-xs text-gray-500 mb-2">FREE Delivery by Amazon</p>
      </Link>
      
      <button 
        onClick={addToCart}
        className={`mt-auto p-2 text-xs md:text-sm border rounded-lg hover:bg-[#f3a847] active:from-yellow-500 active:to-yellow-200 ${isAdded ? 'bg-green-400 border-green-500 text-white' : 'bg-amazon_yellow border-yellow-500'}`}
      >
        {isAdded ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
