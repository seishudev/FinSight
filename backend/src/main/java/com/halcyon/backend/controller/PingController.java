package com.halcyon.backend.controller;

import com.halcyon.backend.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ping")
@Tag(name = "Ping", description = "Тестовый эндпоинт для проверки доступности сервиса")
public class PingController {

    @Operation(
            summary = "Проверить доступность API",
            description = "Простой эндпоинт, который всегда возвращает 200 OK. Используется для проверки, что сервис запущен и отвечает на запросы (health check)."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Сервис доступен",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = SuccessResponse.class)
            )
    )
    @GetMapping
    public ResponseEntity<SuccessResponse> ping() {
        return ResponseEntity.ok(new SuccessResponse("22FAM HACKATHON #1"));
    }
}
