package com.example.shop_service.service.impl;

import com.example.shop_service.model.Shop;
import com.example.shop_service.repository.ShopRepository;
import com.example.shop_service.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository shopRepository;

    @Override
    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    @Override
    public Optional<Shop> getShopById(UUID id) {
        return shopRepository.findById(id);
    }

    @Override
    public Shop createShop(Shop shop) {
        return shopRepository.save(shop);
    }

    @Override
    public Optional<Shop> updateShop(UUID id, Shop shopDetails) {
        return shopRepository.findById(id).map(shop -> {
            shop.setName(shopDetails.getName());
            shop.setEmail(shopDetails.getEmail());
            shop.setPhone(shopDetails.getPhone());
            shop.setAddress(shopDetails.getAddress());
            shop.setTaxCode(shopDetails.getTaxCode());
            return shopRepository.save(shop);
        });
    }

    @Override
    public boolean deleteShop(UUID id) {
        if (!shopRepository.existsById(id)) return false;
        shopRepository.deleteById(id);
        return true;
    }
}
