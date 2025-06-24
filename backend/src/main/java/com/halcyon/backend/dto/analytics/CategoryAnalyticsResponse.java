package com.halcyon.backend.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CategoryAnalyticsResponse {

    private Long categoryId;
    private String categoryName;
    private BigDecimal totalAmount;
    private double percentage;
}
