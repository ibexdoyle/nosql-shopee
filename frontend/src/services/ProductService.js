const PRODUCT_API = "http://localhost:8084/api/products";

export const fetchAllProducts = async () => {
  const res = await fetch(PRODUCT_API);
  return await res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${PRODUCT_API}/${id}`);
  return await res.json();
};

export const fetchProductsByShop = async (shopId) => {
  const res = await fetch(`${PRODUCT_API}/shop/${shopId}`);
  return await res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(PRODUCT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${PRODUCT_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${PRODUCT_API}/${id}`, {
    method: "DELETE",
  });
};
