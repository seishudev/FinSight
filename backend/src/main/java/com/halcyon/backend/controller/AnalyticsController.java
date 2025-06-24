package com.halcyon.backend.controller;

import com.halcyon.backend.dto.analytics.AnalyticsSummaryItemDto;
import com.halcyon.backend.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @Operation(
            summary = "Сводная аналитика за текущий месяц",
            description = "Возвращает 4 ключевых показателя: баланс (доход-расход), общий доход, общий расход и общее количество транзакций за текущий календарный месяц."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Аналитика успешно получена",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = AnalyticsSummaryItemDto.class))))
    })
    @GetMapping("/summary/current-month")
    public ResponseEntity<List<AnalyticsSummaryItemDto>> getSummaryAnalytics() {
        List<AnalyticsSummaryItemDto> summary = analyticsService.getSummaryForCurrentMonth();
        return ResponseEntity.ok(summary);
    }
}
