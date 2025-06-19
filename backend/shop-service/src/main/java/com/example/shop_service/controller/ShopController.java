package com.example.shop_service.controller;

import com.example.shop_service.exception.ResourceNotFoundException;
import com.example.shop_service.model.Shop;
import com.example.shop_service.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @GetMapping
    public List<Shop> getAllShops() {
        return shopService.getAllShops();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shop> getShopById(@PathVariable UUID id) {
        return shopService.getShopById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Shop not found with id: " + id));
    }

    @PostMapping
    public Shop createShop(@RequestBody Shop shop) {
        return shopService.createShop(shop);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shop> updateShop(@PathVariable UUID id, @RequestBody Shop shopDetails) {
        return shopService.updateShop(id, shopDetails)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Shop not found with id: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShop(@PathVariable UUID id) {
        if (!shopService.deleteShop(id)) {
            throw new ResourceNotFoundException("Shop not found with id: " + id);
        }
        return ResponseEntity.noContent().build();
    }
}
