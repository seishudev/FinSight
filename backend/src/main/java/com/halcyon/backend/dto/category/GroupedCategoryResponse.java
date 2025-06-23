package com.halcyon.backend.dto.category;

import com.halcyon.backend.model.support.TransactionType;

import java.util.List;

public record GroupedCategoryResponse(
        TransactionType type,
        List<CategoryResponse> categories) {
}
