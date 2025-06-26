import React, { useState } from "react";
import OrderManager from "../../components/OrderManager/OrderManager";
import ProductManager from "../../components/ProductManager/ProductManager";
import Header from "../../components/Header/Header";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div>
      <Header />
      <div className="flex max-w-7xl mx-auto mt-6 bg-white rounded shadow min-h-[500px]">
        {/* Sidebar */}
        <div className="w-64 border-r p-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Quản lý</h2>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveTab("orders")} className={`w-full text-left px-3 py-2 rounded ${
                  activeTab === "orders"
                    ? "bg-emerald-100 text-emerald-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}>
                Quản lý đơn hàng
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("products")} className={`w-full text-left px-3 py-2 rounded ${
                  activeTab === "products"
                    ? "bg-emerald-100 text-emerald-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}>
                Quản lý sản phẩm
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "orders" && <OrderManager />}
          {activeTab === "products" && <ProductManager />}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;