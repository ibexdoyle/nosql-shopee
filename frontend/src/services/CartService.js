const CART_API = "http://localhost:8086/api/carts";
export const fetchCart = async () => {
  const res = await fetch(CART_API, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Không thể tải giỏ hàng");
  return await res.json();
};


export const addToCart = async (productId, quantity) => {
  const res = await fetch(`${CART_API}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
    credentials: "include"
  });
  console.log(res.body);
  if (!res.ok) throw new Error("Không thể thêm sản phẩm vào giỏ");
  return await res.json();
};

export const removeFromCart = async (productId) => {
  const res = await fetch(`${CART_API}/remove/${productId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Không thể xóa sản phẩm");
  return await res.json();
};

export const clearCart = async () => {
  const res = await fetch(`${CART_API}/clear`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Không thể xóa giỏ hàng");
};