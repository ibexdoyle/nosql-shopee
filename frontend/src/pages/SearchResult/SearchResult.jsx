import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination/Pagination";
import { searchProducts } from "../../services/ProductService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResult = () => {
  const queryParam = useQuery().get("query")?.toLowerCase() || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // frontend page bắt đầu từ 1
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 8; // Số sản phẩm mỗi trang

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await searchProducts(
        queryParam,
        currentPage - 1, // backend page bắt đầu từ 0
        pageSize
      );
      setProducts(data.content);
      setTotalItems(data.totalElements);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryParam, currentPage]);

  return (
    <div className="container">
      <Header />
      <div className="max-w-6xl mx-auto mt-3">
        <h2 className="text-lg font-semibold mb-4">
          Kết quả tìm kiếm cho:{" "}
          <span className="text-mint">{queryParam}</span>
        </h2>

        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : products.length === 0 ? (
          <p>Không tìm thấy sản phẩm nào phù hợp.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* ✅ Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
