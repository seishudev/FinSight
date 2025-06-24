package com.halcyon.backend.dto.analytics;

import com.halcyon.backend.model.support.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class TypedCategoryAnalyticsProjection {

    private TransactionType type;
    private Long categoryId;
    private String categoryName;
    private BigDecimal totalAmount;
}
