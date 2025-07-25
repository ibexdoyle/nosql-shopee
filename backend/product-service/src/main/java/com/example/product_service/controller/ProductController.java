package com.example.product_service.controller;

import com.example.product_service.model.OrderItem;
import com.example.product_service.model.Product;
import com.example.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAll() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable String id) {

        return productService.getProductById(id);
    }

    @GetMapping("/shop/{shopId}")
    public List<Product> getByShop(@PathVariable String shopId) {
        return productService.getProductsByShopId(shopId);
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable String id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public Page<Product> searchProducts(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return productService.searchProducts(keyword, page, size);
    }

}