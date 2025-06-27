package com.halcyon.backend.dto.goal;

import com.halcyon.backend.validation.Emoji;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateGoalRequest {

    @NotBlank(message = "Goal name cannot be blank")
    @Size(min = 2, max = 100, message = "The goal name must contain from 2 to 100 characters.")
    private String name;

    @NotBlank(message = "Goal icon cannot be empty.")
    @Emoji
    private String icon;

    @NotBlank(message = "Goal category cannot be blank")
    @Size(min = 2, max = 50, message = "The goal category must contain from 2 to 50 characters.")
    private String category;

    @NotNull(message = "The target amount cannot be empty.")
    @Positive(message = "The target amount must be greater than zero.")
    private BigDecimal targetAmount;

    @NotNull(message = "The target date cannot be empty.")
    @FutureOrPresent(message = "The target date cannot be in the past.")
    private LocalDate targetDate;
}
