package com.halcyon.backend.controller;

import com.halcyon.backend.dto.SuccessResponse;
import com.halcyon.backend.dto.category.CategoryResponse;
import com.halcyon.backend.dto.category.CreateCategoryRequest;
import com.halcyon.backend.dto.category.GroupedCategoryResponse;
import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@RequestBody @Valid CreateCategoryRequest request) {
        CategoryResponse response = categoryService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getById(@PathVariable Long id) {
        CategoryResponse response = categoryService.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping(params = "type")
    public ResponseEntity<List<CategoryResponse>> getAllByType(@RequestParam TransactionType type) {
        List<CategoryResponse> categories = categoryService.getAllByType(type);
        return ResponseEntity.ok(categories);
    }

    @GetMapping
    public ResponseEntity<List<GroupedCategoryResponse>> getAllUserCategories() {
        List<GroupedCategoryResponse> categories = categoryService.getAllByUser();
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(
            @PathVariable Long id,
            @RequestBody @Valid CreateCategoryRequest request
    ) {
        CategoryResponse response = categoryService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable Long id) {
        categoryService.delete(id);

        var successResponse = new SuccessResponse("Category with id " + id + " has been successfully deleted.");
        return ResponseEntity.ok(successResponse);
    }
}
