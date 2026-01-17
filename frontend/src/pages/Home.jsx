import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const search = params.get("search");
                const category = params.get("category");

                let url = "http://localhost:5001/api/products";
                const queryParams = [];
                if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
                if (category) queryParams.push(`category=${encodeURIComponent(category)}`);
                
                if (queryParams.length > 0) {
                    url += `?${queryParams.join("&")}`;
                }

                const { data } = await axios.get(url);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [location.search]);

  return (
    <div className="max-w-screen-2xl mx-auto bg-gray-100 pb-10">
      <div className="relative">
          {/* Gradient Overlay */}
          <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
          
          <img 
            className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover object-top mask-image-gradient"
            src="https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg" 
            alt="Banner" 
          />
      </div>

      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto z-20 -mt-20 md:-mt-32 lg:-mt-60 px-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        <img className="md:col-span-full w-full" src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/ILB_BrightColors_Approved.jpg" alt="Ad" />

        <div className="md:col-span-2">
            {products.slice(4, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {products.slice(5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
