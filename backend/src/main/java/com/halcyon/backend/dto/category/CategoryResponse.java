package com.halcyon.backend.dto.category;

import com.halcyon.backend.model.support.TransactionType;

public record CategoryResponse(
    Long id,
    String name,
    String icon,
    TransactionType type
) {
}
