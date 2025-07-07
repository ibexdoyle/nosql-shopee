import React, {useState, useEffect} from "react";
import { mockProducts } from "../../pages/SearchResult/data/mock_product_card";
import { fetchProductsByShop } from "../../services/ProductService";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const shopId = 1 ;
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsByShop(shopId);
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [shopId]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh Sách Sản Phẩm</h2>
        <button className="bg-emerald-green text-white px-4 py-1.5 rounded hover:bg-emerald-700">
          <div className="flex items-center gap-1">
            <i className="fi fi-rr-plus-small"></i> Thêm sản phẩm
          </div>
        </button>
      </div>

      {loading ? (
        <div>Đang tải sản phẩm...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-grey text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Tên sản phẩm</th>
                <th className="p-3">Giá</th>
                <th className="p-3">Tồn kho</th>
                <th className="p-3">Đã bán</th>
                <th className="p-3">Danh mục</th>
                <th className="p-3">Ảnh</th>
                <th className="p-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">
                    <div className="flex flex-col">
                      <span className="line-through text-gray-500 mr-1">
                        đ{p.originalPrice.toLocaleString("vi-VN")}
                      </span>
                      <span className="text-green-600 font-medium">
                        đ{p.salePrice.toLocaleString("vi-VN")}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">{p.sold}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">
                    {p.images && p.images.length > 0 ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "Không có ảnh"
                    )}
                  </td>
                  <td className="p-3 space-x-2 text-right flex">
                    <button>
                      <i className="fi fi-sr-pencil text-emerald-green"></i>
                    </button>
                    <button>
                      <i className="fi fi-sr-trash text-emerald-green"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


export default ProductManager;