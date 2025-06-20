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
