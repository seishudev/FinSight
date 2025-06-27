package com.halcyon.backend.controller;

import com.halcyon.backend.dto.SuccessResponse;
import com.halcyon.backend.dto.goal.AddFundsToGoalRequest;
import com.halcyon.backend.dto.goal.CreateGoalRequest;
import com.halcyon.backend.dto.goal.GoalResponse;
import com.halcyon.backend.exception.handler.ErrorDetailsResponse;
import com.halcyon.backend.exception.handler.ValidationErrorsResponse;
import com.halcyon.backend.service.GoalService;
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
@RequestMapping("/api/v1/goals")
@RequiredArgsConstructor
@Tag(name = "Goals", description = "Управление финансовыми целями пользователя")
public class GoalController {

    private final GoalService goalService;

    @Operation(summary = "Создание новой финансовой цели")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Цель успешно создана",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = GoalResponse.class))),
            @ApiResponse(responseCode = "400", description = "Ошибка валидации данных. Проверьте правильность введенных значений.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ValidationErrorsResponse.class))),
            @ApiResponse(responseCode = "409", description = "Цель с таким именем уже существует",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @PostMapping
    public ResponseEntity<GoalResponse> create(@RequestBody @Valid CreateGoalRequest request) {
        GoalResponse response = goalService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Получить все цели текущего пользователя",
            description = "Возвращает список всех целей пользователя с актуальной информацией о накоплениях и статусе.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список целей успешно получен",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = GoalResponse.class))))
    })
    @GetMapping
    public ResponseEntity<List<GoalResponse>> getAll() {
        List<GoalResponse> goals = goalService.getAllForCurrentUser();
        return ResponseEntity.ok(goals);
    }

    @Operation(summary = "Пополнить цель", description = "Добавляет указанную сумму к накоплениям цели.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Цель успешно пополнена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = GoalResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                    Некорректный запрос. Возможные причины:
                    - **Ошибка валидации:** Сумма пополнения не является положительным числом. ```ValidationErrorsResponse```
                    - **Логическая ошибка:** Дедлайн прошел. ```ErrorDetailsResponse```
                    """,
                    content = @Content(mediaType = "application/json", schema = @Schema(oneOf = {ValidationErrorsResponse.class, ErrorDetailsResponse.class}))),
            @ApiResponse(responseCode = "403", description = "Нет доступа к данной цели",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Цель с указанным ID не найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @PatchMapping("/{id}/add-funds")
    public ResponseEntity<GoalResponse> addFunds(
            @PathVariable Long id,
            @RequestBody @Valid AddFundsToGoalRequest request
    ) {
        GoalResponse response = goalService.addFunds(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Удалить цель")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Цель успешно удалена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class))),
            @ApiResponse(responseCode = "403", description = "Нет доступа к данной цели",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Цель с указанным ID не найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable Long id) {
        goalService.delete(id);
        return ResponseEntity.ok(new SuccessResponse("Goal deleted successfully."));
    }
}
