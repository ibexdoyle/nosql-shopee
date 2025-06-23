package com.example.search_service.service.impl;

import com.example.search_service.model.ProductDocument;
import com.example.search_service.repository.ProductSearchRepository;
import com.example.search_service.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final ProductSearchRepository repository;

    @Override
    public List<ProductDocument> searchByName(String keyword) {
        return repository.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public ProductDocument index(ProductDocument product) {
        repository.save(product);
        return product;
    }

    @Override
    public void delete(String productId) {

        repository.deleteById(productId);
    }
}
