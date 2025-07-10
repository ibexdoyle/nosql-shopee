import React, { useState } from "react";
import Header from "../../components/Header/Header";
import FormatNumber from "../../utils/FormatNumber";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { Divider, AppBar, Toolbar, Button, Typography, Box, Checkbox } from "@mui/material";

const Cart = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleQuantityChange = (productId, delta) => {
    updateQuantity(productId, delta);
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
    setSelectedItems((prev) => prev.filter((id) => id !== productId));
  };

  const handleSelect = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    const allIds = cartItems.map((item) => item.productId);
    const allSelected = allIds.every((id) => selectedItems.includes(id));
    setSelectedItems(allSelected ? [] : allIds);
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach((id) => removeItem(id));
    setSelectedItems([]);
  };

  const selectedProducts = cartItems.filter((item) =>
    selectedItems.includes(item.productId)
  );

  const totalAmount = selectedProducts.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );

  const groupedByShop = cartItems.reduce((acc, item) => {
    if (!acc[item.shopId]) {
      acc[item.shopId] = {
        shopName: item.shopName,
        items: [],
      };
    }
    acc[item.shopId].items.push(item);
    return acc;
  }, {});

  if (cartItems.length === 0) {
    return (
      <div>
        <Header />
        <div className="max-w-[1200px] mx-auto p-4 bg-white mt-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">
            <i className="fi fi-sr-shopping-cart mr-3"></i>Giỏ hàng của bạn
          </h2>
          <p>Không có sản phẩm nào trong giỏ hàng.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-[1200px] mx-auto p-4 bg-white mt-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">
          <i className="fi fi-sr-shopping-cart mr-3"></i> Giỏ hàng của bạn
        </h2>

        {Object.entries(groupedByShop).map(([shopId, shop]) => (
          <div key={shopId} className="border p-4 rounded mb-6">
            <h3 className="text-lg font-bold mb-3">{shop.shopName}</h3>
            <Divider />
            {shop.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 py-2 border-b last:border-b-0"
              >
                <Checkbox
                  checked={selectedItems.includes(item.productId)}
                  onChange={() => handleSelect(item.productId)}
                />
                <img
                  src={item.images?.[0] || "/default-image.jpg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold line-clamp-2">
                    <Link
                      to={`/product/${item.productId}`}
                      className="hover:underline text-blue-500"
                    >
                      {item.name}
                    </Link>
                  </h4>
                  <div className="text-sm text-gray-600 mt-1">
                    Địa chỉ: {item.address}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Xóa
                  </button>
                </div>

                <div className="text-right min-w-[160px]">
                  <div className="text-red-500 font-bold text-lg">
                    ₫{item.salePrice.toLocaleString("vi-VN")}
                  </div>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => handleQuantityChange(item.productId, -1)}
                      className="px-2 border"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      readOnly
                      value={item.quantity}
                      className="w-12 text-center border-y"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.productId, 1)}
                      className="px-2 border"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Tổng: ₫
                    {(item.salePrice * item.quantity).toLocaleString("vi-VN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="text-right font-semibold text-xl mt-4">
          Tổng cộng: ₫
          {FormatNumber(
            cartItems.reduce(
              (sum, item) => sum + item.salePrice * item.quantity,
              0
            )
          )}
        </div>
      </div>

      {/* 🛒 Footer */}
      <AppBar
        position="fixed"
        color="default"
        sx={{
          top: "auto",
          bottom: 0,
          boxShadow: "0 -1px 4px rgba(0,0,0,0.1)",
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
          zIndex: 1000,
        }}
      >
        <Toolbar className="justify-between px-4">
          <Box className="flex items-center gap-2">
            <Checkbox
              checked={
                selectedItems.length === cartItems.length &&
                cartItems.length > 0
              }
              onChange={handleSelectAll}
            />
            <Typography variant="body2">
              Chọn Tất Cả ({cartItems.length})
            </Typography>
            <Button
              onClick={handleRemoveSelected}
              size="small"
              color="error"
              disabled={selectedItems.length === 0}
            >
              Xóa
            </Button>
          </Box>

          <Box className="flex items-center gap-4">
            <Typography variant="body2">
              Tổng cộng ({selectedItems.length} sản phẩm):{" "}
              <span className="text-red-500 font-semibold">
                ₫{FormatNumber(totalAmount)}
              </span>
            </Typography>
            <button
              disabled={selectedItems.length === 0}
              onClick={() =>
                navigate("/checkout", { state: { products: selectedProducts } })
              }
              className="bg-emerald-green hover:bg-mint text-white p-3 rounded-md"
            >
              Mua Hàng
            </button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Cart;
