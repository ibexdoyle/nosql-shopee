import React, { useState } from "react";
import OrderManager from "../../components/OrderManager/OrderManager";
import ProductManager from "../../components/ProductManager/ProductManager";
import Header from "../../components/Header/Header";
import AddProductForm from "../../components/AddProductForm/AddProductForm";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div>
      <Header />
      <div className="flex max-w-7xl mx-auto mt-6 bg-white rounded shadow min-h-[500px]">

        <div className="w-64 border-r border-grey p-4">
          <h2 className="text-lg font-semibold mb-4">Quản lý</h2>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveTab("orders")} className={`w-full text-left px-3 py-2 rounded ${
                  activeTab === "orders"
                    ? "text-mint font-semibold"
                    : "hover:bg-grey"
                }`}>
                Quản lý đơn hàng
              </button>
            </li>

            <li>
              <button onClick={() => setActiveTab("products")} className={`w-full text-left px-3 py-2 rounded ${
                  activeTab === "products"
                    ? "text-mint font-semibold"
                    : "hover:bg-grey"
                }`}>
                Quản lý sản phẩm
              </button>
              {activeTab === "products" && (
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab("addProduct")}
                      className={`text-sm w-full text-left px-2 py-1 rounded ${
                        activeTab === "addProduct"
                          ? "text-emerald-500 font-medium"
                          : "hover:bg-grey"
                      }`}
                    >
                      Thêm sản phẩm
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="flex-1 p-6">
          {activeTab === "orders" && <OrderManager />}
          {activeTab === "products" && <ProductManager />}
          {activeTab === "addProduct" && <AddProductForm />}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
