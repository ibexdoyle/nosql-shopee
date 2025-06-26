import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";

const dummyOrders = [
  {
    id: 59217,
    status: "New order",
    itemCount: 1,
    customer: "Cody Fisher",
    shipping: "Standard",
    tracking: "940010010936113003113",
  },
  {
    id: 59213,
    status: "Cancelled",
    itemCount: 2,
    customer: "Kristin Watson",
    shipping: "Priority",
    tracking: "940010010936113003113",
  },
  {
    id: 59219,
    status: "Shipped",
    itemCount: 12,
    customer: "Esther Howard",
    shipping: "Express",
    tracking: "940010010936113003113",
  },
  {
    id: 59210,
    status: "Shipped",
    itemCount: 12,
    customer: "Esther Howard",
    shipping: "Express",
    tracking: "940010010936113003113",
  },
  {
    id: 59211,
    status: "Shipped",
    itemCount: 12,
    customer: "Esther Howard",
    shipping: "Express",
    tracking: "940010010936113003113",
  },
  {
    id: 59222,
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
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredOrders = dummyOrders.filter((o) =>
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );



  return (
    <div>
      <h2 className="text-[2rem] font-bold mb-6">Đơn Hàng</h2>

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
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-50 text-left">
            <tr className="border-b">
              <th className="p-3">Mã đơn hàng </th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Số sản phẩm</th>
              <th className="p-3">Khách hàng</th>
              <th className="p-3">Dịch vụ vận chuyển</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{o.id}</td>
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

      <Pagination currentPage={page} totalItems={filteredOrders.length} pageSize={pageSize} onPageChange={(newPage) => setPage(newPage)}/>
    </div>
  );
}

export default OrderManager