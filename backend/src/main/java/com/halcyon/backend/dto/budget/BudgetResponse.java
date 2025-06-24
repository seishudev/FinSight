package com.halcyon.backend.dto.budget;

import com.halcyon.backend.model.support.BudgetPeriod;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BudgetResponse {

    private Long id;
    private Long categoryId;
    private String categoryName;
    private BigDecimal limitAmount;
    private BudgetPeriod period;
    private BigDecimal spentAmount;
    private BigDecimal remainingAmount;
    private Double percentageUsed;
}
