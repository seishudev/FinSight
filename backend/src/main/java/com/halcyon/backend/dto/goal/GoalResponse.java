package com.halcyon.backend.dto.goal;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class GoalResponse {

    private Long id;
    private String name;
    private String icon;
    private BigDecimal targetAmount;
    private BigDecimal currentAmount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate targetDate;

    private BigDecimal remainingAmount;
    private double percentage;
    private boolean isOverdue;
}
