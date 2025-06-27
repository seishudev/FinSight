package com.halcyon.backend.controller;

import com.halcyon.backend.dto.analytics.AnalyticsSummaryItemResponse;
import com.halcyon.backend.dto.analytics.CategorizedAnalyticsResponse;
import com.halcyon.backend.dto.analytics.ProgressiveItemResponse;
import com.halcyon.backend.dto.analytics.TrendDataPointResponse;
import com.halcyon.backend.exception.handler.ErrorDetailsResponse;
import com.halcyon.backend.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
@Tag(name = "Analytics", description = "Аналитика по финансам пользователя")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @Operation(
            summary = "Сводная аналитика за текущий месяц",
            description = "Возвращает 4 ключевых показателя: баланс (доход-расход), общий доход, общий расход и общее количество транзакций за текущий календарный месяц."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Аналитика успешно получена",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = AnalyticsSummaryItemResponse.class))))
    })
    @GetMapping("/summary/current-month")
    public ResponseEntity<List<AnalyticsSummaryItemResponse>> getSummaryAnalytics() {
        List<AnalyticsSummaryItemResponse> summary = analyticsService.getSummaryForCurrentMonth();
        return ResponseEntity.ok(summary);
    }

    @Operation(
            summary = "Аналитика по категориям за текущий месяц",
            description = "Возвращает детализацию по категориям доходов и расходов за текущий календарный месяц. Для каждой категории указана общая сумма и процент от общей суммы своего типа (дохода или расхода)."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Аналитика успешно получена",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = CategorizedAnalyticsResponse.class)))
    })
    @GetMapping("/categories/current-month")
    public ResponseEntity<CategorizedAnalyticsResponse> getCategorizedAnalytics() {
        CategorizedAnalyticsResponse response = analyticsService.getCategorizedAnalyticsForCurrentMonth();
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Тренд доходов и расходов за последние 7 дней",
            description = "Возвращает список данных для построения графика тренда. Каждая точка в списке представляет один день и содержит сумму доходов и расходов за этот день."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Данные для графика успешно получены",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = TrendDataPointResponse.class))))
    })
    @GetMapping("/trend/last-7-days")
    public ResponseEntity<List<TrendDataPointResponse>> getTrendAnalytics() {
        List<TrendDataPointResponse> response = analyticsService.getIncomeExpenseTrendForLast7Days();
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Получить самый прогрессивный элемент (цель или бюджет)",
            description = """
                Анализирует все цели и бюджеты текущего пользователя и возвращает тот элемент,
                у которого самый высокий процент выполнения на данный момент.
                
                Ответ будет содержать поле `type` ("goal" или "budget") и соответствующий
                вложенный объект с деталями: `goal` или `budget`.
                """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Элемент с наибольшим прогрессом успешно найден.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProgressiveItemResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Не найдено ни одной цели или бюджета у пользователя.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDetailsResponse.class)
                    )
            )
    })
    @GetMapping("/most-used")
    public ResponseEntity<ProgressiveItemResponse> getTopProgressItem() {
        ProgressiveItemResponse response = analyticsService.getTopProgressItem();
        return ResponseEntity.ok(response);
    }
}
