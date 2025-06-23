package com.halcyon.backend.controller;

import com.halcyon.backend.dto.SuccessResponse;
import com.halcyon.backend.dto.category.CategoryResponse;
import com.halcyon.backend.dto.category.CreateCategoryRequest;
import com.halcyon.backend.dto.category.GroupedCategoryResponse;
import com.halcyon.backend.exception.handler.ErrorDetailsResponse;
import com.halcyon.backend.exception.handler.ValidationErrorsResponse;
import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@Tag(
        name = "Categories",
        description = "Управление пользовательскими категориями. Все запросы требуют авторизации через accessToken в HttpOnly cookie."
)
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "Создание новой категории", description = "Создает новую категорию для текущего пользователя.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Категория успешно создана",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = CategoryResponse.class))),
            @ApiResponse(responseCode = "400", description = "Ошибка валидации",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ValidationErrorsResponse.class))),
            @ApiResponse(
                    responseCode = "409",
                    description = "Категория уже существует или превышен лимит категорий данного типа (максимум 50)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))
            )
    })
    @PostMapping
    public ResponseEntity<CategoryResponse> create(@RequestBody @Valid CreateCategoryRequest request) {
        CategoryResponse response = categoryService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Получить категорию по ID", description = "Возвращает категорию по ID, если она принадлежит текущему пользователю.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Категория найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = CategoryResponse.class))),
            @ApiResponse(responseCode = "403", description = "Нет доступа к категории",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Категория не найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getById(@PathVariable Long id) {
        CategoryResponse response = categoryService.getById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Получить категории по типу",
            description = "Возвращает категории текущего пользователя, отфильтрованные по типу категории."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Категории успешно получены",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = CategoryResponse.class))
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Некорректный параметр запроса (неверный тип категории)",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ValidationErrorsResponse.class))
            )
    })
    @GetMapping("/by-type")
    public ResponseEntity<List<CategoryResponse>> getAllByType(
            @Parameter(description = "Тип категории", example = "income") @RequestParam TransactionType type) {
        List<CategoryResponse> categories = categoryService.getAllByType(type);
        return ResponseEntity.ok(categories);
    }

    @Operation(summary = "Получить все категории текущего пользователя", description = "Возвращает сгруппированные по типу категории.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Категории успешно получены",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = GroupedCategoryResponse.class))
                    )
            )
    })
    @GetMapping
    public ResponseEntity<List<GroupedCategoryResponse>> getAllUserCategories() {
        List<GroupedCategoryResponse> categories = categoryService.getAllByUser();
        return ResponseEntity.ok(categories);
    }

    @Operation(summary = "Обновить категорию", description = "Обновляет категорию текущего пользователя по ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Категория успешно обновлена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = CategoryResponse.class))),
            @ApiResponse(responseCode = "400", description = "Ошибка валидации",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ValidationErrorsResponse.class))),
            @ApiResponse(responseCode = "403", description = "Нет доступа к категории",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Категория не найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(
            @PathVariable Long id,
            @RequestBody @Valid CreateCategoryRequest request
    ) {
        CategoryResponse response = categoryService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Удалить категорию", description = "Удаляет категорию текущего пользователя по ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Категория успешно удалена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SuccessResponse.class))),
            @ApiResponse(responseCode = "403", description = "Нет доступа к категории",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
            @ApiResponse(responseCode = "404", description = "Категория не найдена",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable Long id) {
        categoryService.delete(id);

        var successResponse = new SuccessResponse("Category with id " + id + " has been successfully deleted.");
        return ResponseEntity.ok(successResponse);
    }
}
