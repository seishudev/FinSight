package com.halcyon.backend.controller;

import com.halcyon.backend.dto.receipt.ParsedTransactionResponse;
import com.halcyon.backend.exception.handler.ErrorDetailsResponse;
import com.halcyon.backend.service.OcrService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/ocr")
@RequiredArgsConstructor
@Tag(name = "OCR", description = "Распознавание чеков")
public class OcrController {

    private final OcrService ocrService;

    @Operation(
            summary = "Обработать изображение чека",
            description = "Принимает изображение чека, распознает его, определяет сумму, позиции и предлагает наиболее подходящую категорию с помощью AI. Возвращает предзаполненные данные для создания транзакции."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Чек успешно обработан",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ParsedTransactionResponse.class))),
            @ApiResponse(responseCode = "400", description = "Неправильный формат файла",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetailsResponse.class))),
    })
    @PostMapping(value = "/receipt", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ParsedTransactionResponse> processReceipt(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        ParsedTransactionResponse response = ocrService.processReceiptImage(file);
        return ResponseEntity.ok(response);
    }
}
