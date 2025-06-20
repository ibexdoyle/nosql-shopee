import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useUser } from "../../context/UserContext";
import FormatNumber from "../../utils/FormatNumber";
import { useCart } from "../../context/CartContext";
import { toast } from 'react-toastify';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { removeItemsFromCart } = useCart();
  const { user, setUser } = useUser();

  const products = state?.products || [];

  const groupedByShop = products.reduce((acc, item) => {
    if (!acc[item.shopId]) {
      acc[item.shopId] = {
        shopName: item.shopName,
        items: [],
      };
    }
    acc[item.shopId].items.push(item);
    return acc;
  }, {});

  const defaultAddress = user?.addresses?.find((addr) => addr.isDefault);
  const shippingFee = 15000;
  const totalProductPrice = products.reduce(
    (sum, p) => sum + p.salePrice * p.quantity,
    0
  );
  const totalPayment = totalProductPrice + shippingFee;
  const handlePlaceOrder = () => {
    if (!user || user.balance < totalPayment) {
      toast.error("⚠️ Số dư không đủ để thanh toán!");
      return;
    }

    const updatedUser = {
      ...user,
      balance: user.balance - totalPayment,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    removeItemsFromCart(products.map((p) => p.id));

    setTimeout(() => {
      toast.success("Đặt hàng thành công!");
      navigate("/");
    }, 100);
  };

  return (
    <div>
      <Header />
      <div className="max-w-[1200px] mx-auto p-4 bg-white mt-4 rounded">
        <h1 className="text-xl font-bold mb-4">🧾 Xác nhận Đơn Hàng</h1>

        {defaultAddress && (
          <div className="border p-4 rounded mb-6 bg-orange-50">
            <h2 className="text-red-500 font-semibold mb-1">Địa Chỉ Nhận Hàng</h2>
            <p className="font-medium">{defaultAddress.name} ({defaultAddress.phone})</p>
            <p>
              {defaultAddress.detail}, {defaultAddress.ward},{" "}
              {defaultAddress.district}, {defaultAddress.city}
            </p>
          </div>
        )}

        {products.length === 0 ? (
          <p>Không có sản phẩm nào được chọn.</p>
        ) : (
          <div>
            {Object.entries(groupedByShop).map(([shopId, shop]) => (
              <div key={shopId} className="mb-6 border p-4 rounded">
                <h2 className="font-semibold text-lg mb-2 text-emerald-600">
                  {shop.shopName}
                </h2>
                <ul>
                  {shop.items.map((p) => (
                    <li
                      key={p.id}
                      className="flex justify-between py-2 border-b"
                    >
                      <div className="flex gap-2">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <span>
                          {p.name} (x{p.quantity})
                        </span>
                      </div>
                      <span>
                        ₫{(p.salePrice * p.quantity).toLocaleString("vi-VN")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Tổng kết */}
            <div className="text-right mt-4 space-y-1">
              <p>
                Tiền hàng: ₫
                <span className="font-medium">
                  {(totalProductPrice).toLocaleString("vi-VN")}
                </span>
              </p>
              <p>
                Phí vận chuyển: ₫
                <span className="font-medium">
                  {(shippingFee).toLocaleString("vi-VN")}
                </span>
              </p>
              <p className="text-lg font-bold text-red-500">
                Tổng thanh toán: ₫{(totalPayment).toLocaleString("vi-VN")}
              </p>
              <p className="text-sm text-gray-500">
                Số dư tài khoản: ₫{(user.balance).toLocaleString("vi-VN")}
              </p>
              <button
                onClick={handlePlaceOrder}
                disabled={user.balance < totalPayment}
                className="bg-emerald-green text-white px-6 py-2 mt-3 rounded disabled:opacity-50"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
