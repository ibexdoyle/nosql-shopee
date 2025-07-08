package com.example.product_service.service.impl;

import com.example.product_service.event.produce.ProductCreatedEvent;
import com.example.product_service.event.produce.ProductDeletedEvent;
import com.example.product_service.event.produce.ProductUpdatedEvent;
import com.example.product_service.exception.ResourceNotFoundException;
import com.example.product_service.model.OrderItem;
import com.example.product_service.model.Product;
import com.example.product_service.producer.ProductEventPublisher;
import com.example.product_service.repository.ProductRepository;
import com.example.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductEventPublisher productEventPublisher;

    @Override
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    @Override
    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public List<Product> getProductsByShopId(String shopId) {
        return productRepository.findByShopId(shopId);
    }

    @Override
    public Product createProduct(Product product) {
        Product saved = productRepository.save(product); // lưu trước

        // Publish event sau khi lưu thành công
        productEventPublisher.publishProductCreated(ProductCreatedEvent.builder()
                .productId(saved.getId())
                .name(saved.getName())
                .description(saved.getDescription())
                .originalPrice(saved.getOriginalPrice())
                .salePrice(saved.getSalePrice())
                .sold(saved.getSold())
                .stock(saved.getStock())
                .shopId(saved.getShopId())
                .build());

        return saved;
    }


    @Override
    public Product updateProduct(String id, Product updated) {
        Product product = getProductById(id);
        product.setName(updated.getName());
        product.setDescription(updated.getDescription());
        product.setOriginalPrice(updated.getOriginalPrice());
        product.setSalePrice(updated.getSalePrice());
        product.setSold(updated.getSold());
        product.setStock(updated.getStock());
        product.setImages(updated.getImages());
        product.setCategory(updated.getCategory());
        Product saved = productRepository.save(product);

        // Publish ProductUpdatedEvent
        productEventPublisher.publishProductUpdated(ProductUpdatedEvent.builder()
                .productId(saved.getId())
                .name(saved.getName())
                .description(saved.getDescription())
                .originalPrice(saved.getOriginalPrice())
                .salePrice(saved.getSalePrice())
                .stock(saved.getStock())
                .shopId(saved.getShopId())
                .build());

        return saved;
    }

    @Override
    public void deleteProduct(String id) {
        Product product = getProductById(id);
        productRepository.deleteById(id);

        // Publish ProductDeletedEvent
        productEventPublisher.publishProductDeleted(ProductDeletedEvent.builder()
                .productId(product.getId())
                .build());
    }


    @Override
    public boolean checkAndReserve(List<OrderItem> items) {
        for (OrderItem item : items) {
            Product product = productRepository.findById(item.getProductId()).orElse(null);
            if (product == null || product.getStock() < item.getQuantity()) {
                return false;
            }
        }
        for (OrderItem item : items) {
            Product product = productRepository.findById(item.getProductId()).get();
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
        }
        return true;
    }

    @Override
    public void rollbackStock(List<OrderItem> items) {
        for (OrderItem item : items) {
            Product product = productRepository.findById(item.getProductId()).orElse(null);
            if (product != null) {
                product.setStock(product.getStock() + item.getQuantity());
                productRepository.save(product);
            }
        }
    }

    @Override
    public Page<Product> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        return productRepository.findByNameContainingIgnoreCase(keyword, pageable);
    }

}
