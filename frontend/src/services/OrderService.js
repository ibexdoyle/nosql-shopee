const ORDER_API = "http://localhost:8088/api/orders";
export const createOrder = async (orderData) => {
  const res = await fetch(ORDER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) throw new Error("Đặt hàng thất bại");
  return await res.json();
};
