package com.example.search_service.service;

import com.example.search_service.model.ProductDocument;

import java.util.List;

public interface SearchService {
    List<ProductDocument> searchByName(String keyword);
    ProductDocument index(ProductDocument product);
    void delete(String productId);
}
