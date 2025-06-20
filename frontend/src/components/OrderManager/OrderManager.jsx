import React, { useState } from "react";

const dummyOrders = [
  {
    id: 59217,
    number: "59217342",
    status: "New order",
    itemCount: 1,
    customer: "Cody Fisher",
    shipping: "Standard",
    tracking: "940010010936113003113",
  },
  {
    id: 59213,
    number: "59217343",
    status: "Cancelled",
    itemCount: 2,
    customer: "Kristin Watson",
    shipping: "Priority",
    tracking: "940010010936113003113",
  },
  {
    id: 59219,
    number: "59217344",
    status: "Shipped",
    itemCount: 12,
    customer: "Esther Howard",
    shipping: "Express",
    tracking: "940010010936113003113",
  },
];

const statusColors = {
  "New order": "bg-light-blue text-navy",
  Shipped: "bg-mint text-emerald-green",
  Cancelled: "bg-pink text-red",
  Rejected: "bg-pink text-purple",
};

const shippingColors = {
  Standard: "text-purple",
  Priority: "text-light-blue",
  Express: "text-red",
};
const OrderManager = () =>{
  const [search, setSearch] = useState("");

  const filteredOrders = dummyOrders.filter(
    (o) =>
      o.number.includes(search) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🧾 Đơn hàng</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <select className="border px-3 py-2 rounded">
          <option>Trạng thái</option>
          {/* sau này lọc theo trạng thái */}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-50 text-left">
            <tr className="border-b">
              <th className="p-3">ORDER ID</th>
              <th className="p-3">ORDER NUMBER</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">ITEM</th>
              <th className="p-3">CUSTOMER</th>
              <th className="p-3">SHIPPING</th>
              <th className="p-3">TRACKING</th>
              <th className="p-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.number}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      statusColors[o.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="p-3">{o.itemCount}</td>
                <td className="p-3">{o.customer}</td>
                <td className="p-3">
                  <span className={`${shippingColors[o.shipping]} font-medium`}>
                    ● {o.shipping}
                  </span>
                </td>
                <td className="p-3">{o.tracking}</td>
                <td className="p-3 text-right">
                  <button title="Edit" className="text-gray-500 hover:text-black">
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination giả */}
      <div className="flex justify-between items-center text-sm mt-4 text-gray-600">
        <p>Hiển thị {filteredOrders.length} trong tổng {dummyOrders.length} đơn</p>
        <div className="flex gap-2">
          <button className="px-2">‹</button>
          <button className="px-2 bg-emerald-600 text-white rounded">1</button>
          <button className="px-2">2</button>
          <button className="px-2">3</button>
          <button className="px-2">›</button>
        </div>
      </div>
    </div>
  );
}

export default OrderManager