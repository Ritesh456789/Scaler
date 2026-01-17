import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Header() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (category && category !== "All") params.append("category", category);
    
    navigate(`/?${params.toString()}`);
  };

  const categories = [
    "All",
    "Men's Clothing",
    "Electronics",
    "Bags"
  ];

  return (
    <nav className="bg-amazon_blue text-white sticky top-0 z-50">
      <div className="flex items-center p-2 flex-grow gap-2">
        {/* Logo */}
        <Link to="/" onClick={() => {setSearchTerm(""); setCategory("All");}} className="mx-2 flex items-center border border-transparent hover:border-white cursor-pointer px-1 py-1 rounded-sm overflow-hidden">
             <img 
               src="http://pngimg.com/uploads/amazon/amazon_PNG25.png" 
               alt="Amazon" 
               className="w-24 mt-2 object-contain"
             />
             <span className="text-sm pb-1 mb-1 font-bold -ml-[2px] text-white hidden md:inline-block">.in</span>
        </Link>
        
        {/* Address (Hidden on mobile) */}
        <div className="hidden md:flex flex-col mx-2 border border-transparent hover:border-white cursor-pointer px-1 py-1 rounded-sm">
             <div className="flex flex-col text-xs text-gray-300">
                <span className="ml-4">Hello</span>
                <span className="flex items-center font-bold text-white text-sm">
                   <FaMapMarkerAlt className="h-4 mr-1"/>
                   Select your address
                </span>
             </div>
        </div>

        {/* Search */}
        <div className="hidden sm:flex flex-grow items-center h-10 rounded-md bg-amazon_yellow cursor-pointer hover:bg-[#f3a847] focus-within:ring-2 focus-within:ring-[#f90]">
             <select 
                value={category}
                onChange={(e) => {
                    const newCat = e.target.value;
                    setCategory(newCat);
                    // Execute search immediately on category change
                    const params = new URLSearchParams();
                    if (searchTerm) params.append("search", searchTerm);
                    if (newCat && newCat !== "All") params.append("category", newCat);
                    navigate(`/?${params.toString()}`);
                }}
                className="p-2 h-full bg-gray-100 text-black text-xs rounded-l-md border-r border-gray-300 outline-none w-auto max-w-[150px] cursor-pointer"
             >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>
             <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-grow h-full p-2 border-none outline-none text-black px-4" 
                type="text" 
                placeholder="Search Amazon.in"
             />
             <div onClick={handleSearch} className="p-2 h-full bg-amazon_yellow hover:bg-[#f3a847] rounded-r-md flex items-center justify-center w-12 transition-colors">
                 <FaSearch className="text-black" />
             </div>
        </div>

        {/* Right Nav */}
        <div className="flex text-white space-x-4 items-center mx-2 text-xs">
            <div className="hidden md:flex flex-col border border-transparent hover:border-white cursor-pointer px-1 py-1 rounded-sm">
                <span className="text-gray-300">Hello, sign in</span>
                <span className="font-bold text-sm">Account & Lists</span>
            </div>
            <div className="hidden md:flex flex-col border border-transparent hover:border-white cursor-pointer px-1 py-1 rounded-sm">
                <span className="text-gray-300">Returns</span>
                <span className="font-bold text-sm">& Orders</span>
            </div>
            
            <Link to="/cart" className="flex items-center border border-transparent hover:border-white cursor-pointer px-1 py-1 rounded-sm">
                <div className="relative">
                    <span className="absolute top-0 right-0 h-4 w-4 bg-amazon_yellow text-center rounded-full text-black font-bold text-xs -mt-1 -mr-2 z-10 flex items-center justify-center">
                        {cart?.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                    <FaShoppingCart className="text-3xl" />
                 </div>
                <span className="hidden md:flex font-bold text-sm mt-3 ml-1">Cart</span>
            </Link>
        </div>
      </div>
      
      {/* Sub Nav */}
      <div className="flex items-center bg-amazon_blue-light text-white text-sm p-2 pl-6 space-x-3 overflow-x-auto">
          <div className="flex items-center gap-1 font-bold cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded-sm">
            <FaBars /> All
          </div>
          <p className="cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded-sm whitespace-nowrap">Today's Deals</p>
          <p className="cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded-sm whitespace-nowrap">Customer Service</p>
          <p className="cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded-sm whitespace-nowrap">Registry</p>
          <p className="cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded-sm whitespace-nowrap">Gift Cards</p>
          <p className="cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded-sm whitespace-nowrap">Sell</p>
      </div>
    </nav>
  );
}

export default Header;
