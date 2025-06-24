package com.halcyon.backend.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class CategorizedAnalyticsResponse {

    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private List<CategoryAnalyticsResponse> incomeCategories;
    private List<CategoryAnalyticsResponse> expenseCategories;
}
