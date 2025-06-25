package com.halcyon.backend.controller;

import com.halcyon.backend.dto.ai.AiChatRequest;
import com.halcyon.backend.dto.ai.AiChatResponse;
import com.halcyon.backend.service.AiAssistantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@Tag(name = "AI Assistant", description = "Взаимодействие с AI-помощником")
public class AiAssistantController {

    private final AiAssistantService aiAssistantService;

    @Operation(
            summary = "Отправить сообщение AI-помощнику",
            description = "Обрабатывает запрос пользователя и возвращает ответ от AI."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ответ успешно получен",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = AiChatResponse.class)))
    })
    @PostMapping("/chat")
    public ResponseEntity<AiChatResponse> chatWithAssistant(@RequestBody @Valid AiChatRequest aiChatRequest) {
        String response = aiAssistantService.getChatResponse(aiChatRequest.getMessage());
        return ResponseEntity.ok(new AiChatResponse(response));
    }
}
