package com.example.search_service.controller;

import com.example.search_service.model.ProductDocument;
import com.example.search_service.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/searchs")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public ResponseEntity<List<ProductDocument>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(searchService.searchByName(keyword));
    }

    @PostMapping("/index")
    public ProductDocument indexProduct(@RequestBody ProductDocument product) {
        return searchService.index(product);
    }

}

