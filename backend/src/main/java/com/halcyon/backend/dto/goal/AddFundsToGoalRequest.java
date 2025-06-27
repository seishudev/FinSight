package com.halcyon.backend.dto.goal;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddFundsToGoalRequest {

    @NotNull(message = "The amount cannot be empty.")
    @Positive(message = "The amount must be more than zero.")
    private BigDecimal amount;
}
