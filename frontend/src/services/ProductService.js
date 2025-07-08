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

export const searchProducts = async (keyword, page = 0, size = 8) => {
  const url = `${PRODUCT_API}/search?keyword=${encodeURIComponent(
    keyword
  )}&page=${page}&size=${size}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json(); 
};