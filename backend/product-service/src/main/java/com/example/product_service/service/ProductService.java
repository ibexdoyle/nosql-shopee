package com.example.product_service.service;

import com.example.product_service.model.OrderItem;
import com.example.product_service.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(String id);
    List<Product> getProductsByShopId(String shopId);
    Product createProduct(Product product);
    Product updateProduct(String id, Product product);
    void deleteProduct(String id);
    boolean checkAndReserve(List<OrderItem> items);
    void rollbackStock(List<OrderItem> items);
    Page<Product> searchProducts(String keyword, int page, int size);
}