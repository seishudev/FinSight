package com.halcyon.backend.dto.goal;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddFundsToGoalRequest {

    @NotNull(message = "The amount cannot be empty.")
    private BigDecimal amount;
}
