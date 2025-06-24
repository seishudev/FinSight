package com.halcyon.backend.dto.budget;

import com.halcyon.backend.model.support.BudgetPeriod;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateBudgetRequest {

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotNull(message = "Limit amount is required")
    @Positive(message = "Limit amount must be positive")
    private BigDecimal limitAmount;

    @NotNull(message = "Budget period is required")
    private BudgetPeriod period;
}
