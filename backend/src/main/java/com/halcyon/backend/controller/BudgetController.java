package com.halcyon.backend.controller;

import com.halcyon.backend.dto.SuccessResponse;
import com.halcyon.backend.dto.budget.BudgetResponse;
import com.halcyon.backend.dto.budget.CreateBudgetRequest;
import com.halcyon.backend.exception.handler.ErrorDetailsResponse;
import com.halcyon.backend.exception.handler.ValidationErrorsResponse;
import com.halcyon.backend.service.BudgetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/budgets")
@RequiredArgsConstructor
@Tag(name = "Budgets", description = "Управление бюджетами и лимитами по категориям расходов")
public class BudgetController {

    private final BudgetService budgetService;

    @Operation(summary = "Создание нового бюджета", description = "Создает новый бюджет для текущего пользователя по категории расходов.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Бюджет успешно создан",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BudgetResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                Некорректный запрос. Возможные причины:
                - **Ошибка валидации полей:** Неверный формат данных (например, отрицательная сумма). В этом случае тело ответа будет соответствовать схеме `ValidationErrorsResponse`.
                - **Логическая ошибка:** Попытка создать бюджет для категории доходов. В этом случае тело ответа будет соответствовать схеме `ErrorDetailsResponse`.
                """,
                    content = @Content(mediaType = "application/json", schema = @Schema(oneOf = {
                            ValidationErrorsResponse.class,
                            ErrorDetailsResponse.class
                    }))),
            @ApiResponse(responseCode = "409", description = "Бюджет для данной категории и периода уже существует",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @PostMapping
    public ResponseEntity<BudgetResponse> create(@RequestBody @Valid CreateBudgetRequest request) {
        BudgetResponse response = budgetService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Получить все бюджеты пользователя", description = "Возвращает список всех бюджетов текущего пользователя с актуальной информацией о тратах.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Бюджеты успешно получены",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = BudgetResponse.class))))
    })
    @GetMapping
    public ResponseEntity<List<BudgetResponse>> getUserBudgets() {
        List<BudgetResponse> budgets = budgetService.getUserBudgets();
        return ResponseEntity.ok(budgets);
    }

    @Operation(summary = "Удалить бюджет", description = "Удаляет бюджет текущего пользователя по ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Бюджет успешно удален",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class))),
            @ApiResponse(responseCode = "403", description = "Нет доступа к бюджету",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Бюджет не найден",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable Long id) {
        budgetService.delete(id);
        return ResponseEntity.ok(new SuccessResponse("Budget with id " + id + " has been successfully deleted."));
    }

    @Operation(summary = "Получить самый заполненный бюджет", description = """
        Возвращает бюджет с наибольшим процентом использования среди всех бюджетов текущего пользователя.
        Используется для отображения на дашборде или в аналитике.
        """)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Самый заполненный бюджет успешно получен",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BudgetResponse.class))),
            @ApiResponse(responseCode = "404", description = "У пользователя нет ни одного бюджета",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @GetMapping("/most-used")
    public ResponseEntity<BudgetResponse> getMostUsedBudget() {
        BudgetResponse response = budgetService.getMostUsedBudget();
        return ResponseEntity.ok(response);
    }
}
