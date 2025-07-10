import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useUser } from "../../context/UserContext";
import FormatNumber from "../../utils/FormatNumber";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/OrderService";
import { toast } from 'react-toastify';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { removeItem } = useCart();
  const { user, setUser } = useUser();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

   const products = Array.isArray(state?.products) ? state.products : [];

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
    const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("⚠️ Bạn cần đăng nhập để đặt hàng!");
      navigate("/auth");
      return;
    }

    if (products.length === 0) {
      toast.error("⚠️ Không có sản phẩm nào để đặt hàng!");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderRequest = {
        userId: user.id,
        shopId: products[0].shopId, 
        total: totalPayment,
        items: products.map((p) => ({
          productId: p.productId,
          quantity: p.quantity,
          price: p.salePrice,
        })),
      };
      const orderResponse = await createOrder(orderRequest);

      toast.success(`Đặt hàng thành công! Mã đơn: ${orderResponse.orderId}`);

      removeItem(products.map((p) => p.productId));

      navigate(`/`);
    } catch (error) {
      console.error(error);
      toast.error("Đặt hàng thất bại, vui lòng thử lại!");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-[1200px] mx-auto p-4 bg-white mt-4 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center text-emerald-green">Xác nhận Đơn Hàng</h1>

        {defaultAddress && (
          <div className="border border-smoke p-4 rounded mb-6 bg-orange-50">
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
              <div className="border border-smoke rounded-md p-4 bg-white">
                <h2 className="text-lg font-bold mb-4">Danh sách sản phẩm</h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-smoke">
                      <th className="text-left py-2">Sản phẩm</th>
                      <th className="text-center py-2">Đơn giá</th>
                      <th className="text-center py-2">Số lượng</th>
                      <th className="text-center py-2">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.productId} className="border-b border-smoke">
                        <td className="flex items-center gap-3 py-3">
                          <img
                            src={p.images?.[0] || "/default-image.jpg"}
                            alt={p.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-sm">{p.name}</p>
                            <p className="text-sm text-gray-500">
                              {p.variant || ""}
                            </p>
                          </div>
                        </td>

                        <td className="text-center text-sm text-gray-800">
                          ₫{(p.salePrice || 0).toLocaleString("vi-VN")}
                        </td>

                        {/* Số lượng */}
                        <td className="text-center text-sm text-gray-800">{p.quantity}</td>

                        {/* Thành tiền */}
                        <td className="text-center text-sm font-semibold text-red-500">
                          ₫{((p.salePrice || 0) * (p.quantity || 0)).toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

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
              <button
                onClick={handlePlaceOrder}
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
