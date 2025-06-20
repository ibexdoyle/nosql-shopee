const SHOP_KEY = "sellers";

export const getAllSellers = () => {
  return JSON.parse(localStorage.getItem(SHOP_KEY)) || [];
};

export const getSellerByUserId = (userId) => {
  return getAllSellers().find((s) => s.userId === userId);
};

export const registerSeller = (shopInfo) => {
  const exists = getSellerByUserId(shopInfo.userId);
  if (exists) return exists;

  const newShop = {
    ...shopInfo,
    createdAt: new Date().toISOString(),
  };

  const updated = [...getAllSellers(), newShop];
  localStorage.setItem(SHOP_KEY, JSON.stringify(updated));
  return newShop;
};


// const SHOP_API = "http://localhost:8080/api/shops"; 

// export const getAllSellers = async () => {
//   const res = await fetch(SHOP_API);
//   if (!res.ok) throw new Error("Không thể tải danh sách shop");
//   return await res.json();
// };


// export const getSellerById = async (id) => {
//   const res = await fetch(`${SHOP_API}/${id}`);
//   if (!res.ok) throw new Error("Không tìm thấy shop");
//   return await res.json();
// };

// export const getSellerByUserId = async (userId) => {
//   const all = await getAllSellers();
//   return all.find((s) => String(s.userId) === String(userId));
// };


// export const registerSeller = async (shopInfo) => {
//   const res = await fetch(SHOP_API, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(shopInfo),
//   });

//   if (!res.ok) throw new Error("Đăng ký shop thất bại");
//   return await res.json();
// };


// export const updateShop = async (id, shopDetails) => {
//   const res = await fetch(`${SHOP_API}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(shopDetails),
//   });

//   if (!res.ok) throw new Error("Cập nhật shop thất bại");
//   return await res.json();
// };


// export const deleteShop = async (id) => {
//   const res = await fetch(`${SHOP_API}/${id}`, {
//     method: "DELETE",
//   });

//   if (!res.ok) throw new Error("Xoá shop thất bại");
// };