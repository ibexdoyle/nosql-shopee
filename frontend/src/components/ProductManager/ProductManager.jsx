import React from "react";
const ProductManager = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📦 Danh sách sản phẩm</h2>
        <button className="bg-emerald-600 text-white px-4 py-1.5 rounded hover:bg-emerald-700">
          ➕ Thêm sản phẩm
        </button>
      </div>

      <p>Hiện tất cả sản phẩm của shop tại đây.</p>
      {/* Sau này có thể map sản phẩm từ localStorage hoặc backend */}
    </div>
  );
};

export default ProductManager;