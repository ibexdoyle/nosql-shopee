const BASE_URL = "http://localhost:8080/api/cart"; 

export const getCart = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  if (!res.ok) throw new Error("Không thể tải giỏ hàng");
  return await res.json(); // Cart object
};

export const addItemToCart = async (userId, productId, quantity) => {
  const res = await fetch(`${BASE_URL}/${userId}/add?productId=${productId}&quantity=${quantity}`, {
    method: "POST"
  });
  if (!res.ok) throw new Error("Thêm sản phẩm thất bại");
  return await res.json();
};

export const removeItemFromCart = async (userId, productId) => {
  const res = await fetch(`${BASE_URL}/${userId}/remove?productId=${productId}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Xoá sản phẩm thất bại");
  return await res.json();
};

export const clearUserCart = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}/clear`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Xoá giỏ hàng thất bại");
};
