import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
     const fetchProduct = async () => {
         try {
             const { data } = await axios.get(`http://localhost:5001/api/products/${id}`);
             setProduct(data);
         } catch (error) {
             console.error("Error fetching product:", error);
         }
     };
     fetchProduct();
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const buyNow = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    navigate('/checkout');
  }

  return (
    <div className="bg-white min-h-screen p-4">
        <Link to="/" className="text-sm text-gray-500 mb-4 hover:underline">Back to results</Link>
        <div className="flex flex-col md:flex-row gap-8 mt-4 max-w-screen-xl mx-auto">
            {/* Image sticky on desktop */}
            <div className="md:w-1/3 flex justify-center md:sticky md:top-24 h-fit">
               <img src={product.image} alt={product.title} className="max-h-[400px] object-contain" />
            </div>

            {/* Details */}
            <div className="md:w-1/3 flex flex-col gap-2">
                <h1 className="text-2xl font-medium text-gray-900">{product.title}</h1>
                <Link to="/" className="text-blue-500 hover:underline text-sm capitalize">Visit the {product.category} Store</Link>
                
                <div className="flex items-center gap-2">
                   <div className="flex text-yellow-500 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(product.rating?.rate || 4) ? "text-yellow-500" : "text-gray-300"} />
                        ))}
                   </div>
                   <span className="text-blue-500 hover:underline text-sm">{product.rating?.count} ratings</span>
                </div>

                <div className="border-t border-b border-gray-200 py-4 my-2">
                    <div className="flex items-start gap-1">
                        <span className="text-xs mt-1">$</span>
                        <span className="text-3xl font-medium">{Math.floor(product.price)}</span>
                        <span className="text-xs mt-1">{(product.price % 1).toFixed(2).substring(1)}</span>
                    </div>
                </div>

                <div className="text-sm">
                    <p className="font-bold">About this item</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                        {product.description.split('.').map((sentence, i) => 
                            sentence.trim() && <li key={i}>{sentence}.</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Buy Box */}
            <div className="md:w-1/4 h-fit border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                     <div className="flex items-start gap-1 text-red-700">
                        <span className="text-xs mt-1">$</span>
                        <span className="text-2xl font-medium">{Math.floor(product.price)}</span>
                        <span className="text-xs mt-1">{(product.price % 1).toFixed(2).substring(1)}</span>
                    </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                    Free Delivery by <span className="font-bold text-black">Monday, Jan 22</span>
                </div>
                 <div className="flex items-center text-xs gap-1 mt-2 text-blue-600 hover:underline cursor-pointer">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>Deliver to User - New York 10001</span>
                </div>

                <div className="text-xl text-green-700 my-4 font-medium">In Stock</div>
                
                <div className="flex flex-col gap-2">
                    <button 
                        onClick={addToCart}
                        className={`w-full border rounded-full py-2 shadow-sm text-sm ${isAdded ? 'bg-green-400 border-green-500 text-white' : 'bg-amazon_yellow border-yellow-500 hover:bg-[#f3a847]'}`}
                    >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                    </button>
                    <button 
                        onClick={buyNow}
                        className="w-full bg-[#fa8900] border border-[#fa8900] rounded-full py-2 hover:bg-[#e37b00] shadow-sm text-sm"
                    >
                        Buy Now
                    </button>
                </div>

                 <div className="text-xs text-gray-500 mt-4 space-y-2">
                    <div className="flex justify-between">
                        <span>Ships from</span>
                        <span className="text-black">Amazon</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Sold by</span>
                        <span className="text-black">Amazon Service</span>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
}

export default ProductDetail;
