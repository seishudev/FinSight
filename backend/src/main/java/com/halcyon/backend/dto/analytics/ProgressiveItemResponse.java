package com.halcyon.backend.dto.analytics;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.halcyon.backend.dto.budget.BudgetResponse;
import com.halcyon.backend.dto.goal.GoalResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProgressiveItemResponse {

    @Schema(description = "Тип элемента: 'goal' или 'budget'", example = "goal")
    private String type;

    @Schema(description = "Детали цели. Присутствует, только если type = 'goal'.")
    private GoalResponse goal;

    @Schema(description = "Детали бюджета. Присутствует, только если type = 'budget'.")
    private BudgetResponse budget;
}
