package com.example.shop_service.service;

import com.example.shop_service.model.Shop;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ShopService {
    List<Shop> getAllShops();
    Optional<Shop> getShopById(UUID id);
    Shop createShop(Shop shop);
    Optional<Shop> updateShop(UUID id, Shop shopDetails);
    boolean deleteShop(UUID id);
}