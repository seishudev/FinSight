package com.halcyon.backend.controller;

import com.halcyon.backend.dto.SuccessResponse;
import com.halcyon.backend.dto.transaction.CreateTransactionRequest;
import com.halcyon.backend.dto.transaction.TransactionResponse;
import com.halcyon.backend.exception.handler.ErrorDetailsResponse;
import com.halcyon.backend.exception.handler.ValidationErrorsResponse;
import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
@Tag(
        name = "Transactions",
        description = "Управление транзакциями пользователя (доходы/расходы). Все запросы требуют авторизации."
)
public class TransactionController {

    private final TransactionService transactionService;

    @Operation(summary = "Создание новой транзакции", description = "Создает новую транзакцию для текущего пользователя.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Транзакция успешно создана",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TransactionResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                Некорректный запрос. Возможные причины:
                - **Ошибка валидации полей:** Неверный формат данных (например, отрицательная сумма, некорректная дата). Тело ответа будет содержать `ValidationErrorsResponse`.
                - **Несоответствие типов:** Тип транзакции (INCOME/EXPENSE) не совпадает с типом указанной категории. Тело ответа будет содержать `ErrorDetailsResponse`.
                """,
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(oneOf = {ValidationErrorsResponse.class, ErrorDetailsResponse.class}))
                    }),
            @ApiResponse(responseCode = "404", description = "Указанная категория не найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @PostMapping
    public ResponseEntity<TransactionResponse> create(@RequestBody @Valid CreateTransactionRequest request) {
        TransactionResponse response = transactionService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Получить транзакцию по ID", description = "Возвращает транзакцию по ID, если она принадлежит текущему пользователю.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Транзакция найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TransactionResponse.class))),
            @ApiResponse(responseCode = "403", description = "Нет доступа к данной транзакции",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Транзакция не найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponse> getById(@PathVariable Long id) {
        TransactionResponse response = transactionService.getById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Получить историю транзакций",
            description = "Возвращает страницу с историей транзакций текущего пользователя. Поддерживает пагинацию, сортировку и фильтрацию."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "История транзакций успешно получена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Page.class)))
    })
    @GetMapping
    public ResponseEntity<Page<TransactionResponse>> getHistory(
            @Parameter(description = "Фильтр по типу транзакции (INCOME или EXPENSE)")
            @RequestParam(name = "type", required = false) TransactionType type,
            @Parameter(description = "Фильтр по ID категории")
            @RequestParam(name = "categoryId", required = false) Long categoryId,
            @ParameterObject @PageableDefault(sort = "date", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Page<TransactionResponse> historyPage = transactionService.getHistory(type, categoryId, pageable);
        return ResponseEntity.ok(historyPage);
    }

    @Operation(summary = "Обновить транзакцию", description = "Обновляет транзакцию текущего пользователя по ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Транзакция успешно обновлена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TransactionResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                Некорректный запрос. Возможные причины:
                - **Ошибка валидации полей:** Неверный формат данных (например, отрицательная сумма, некорректная дата). Тело ответа будет содержать `ValidationErrorsResponse`.
                - **Несоответствие типов:** Тип транзакции (INCOME/EXPENSE) не совпадает с типом указанной категории. Тело ответа будет содержать `ErrorDetailsResponse`.
                """,
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(oneOf = {ValidationErrorsResponse.class, ErrorDetailsResponse.class}))
                    }),
            @ApiResponse(responseCode = "403", description = "Нет доступа к данной транзакции",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Транзакция или категория не найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @PutMapping("/{id}")
    private ResponseEntity<TransactionResponse> update(
            @PathVariable Long id,
            @RequestBody @Valid CreateTransactionRequest request
    ) {
        TransactionResponse response = transactionService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Удалить транзакцию", description = "Удаляет транзакцию текущего пользователя по ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Транзакция успешно удалена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class))),
            @ApiResponse(responseCode = "403", description = "Нет доступа к данной транзакции",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Транзакция не найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable Long id) {
        transactionService.delete(id);

        var successResponse = new SuccessResponse("Transaction with id " + id + " has been successfully deleted.");
        return ResponseEntity.ok(successResponse);
    }
}
