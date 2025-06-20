import React from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { mockProducts } from "./data/mock_product_card";
import Header from "../../components/Header/Header";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResult = () =>{
    const query = useQuery().get('query')?.toLowerCase() || '';

    const products = mockProducts; // 

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );

    return(
        <div className="container">
            <Header/>
            <div className="max-w-6xl mx-auto mt-3">
                <h2 className="text-lg font-semibold mb-4">
                    Kết quả tìm kiếm cho: '<span className="text-mint">{query}</span>'
                </h2>

                {filteredProducts.length === 0 ? (
                    <p>Không tìm thấy sản phẩm nào phù hợp.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                    </div>
                )}
            </div>
        </div>
        
    )
}

export default SearchResult;