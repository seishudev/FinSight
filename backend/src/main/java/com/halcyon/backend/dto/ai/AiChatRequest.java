package com.halcyon.backend.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiChatRequest {

    @NotBlank(message = "AI Chat message is required")
    private String message;
}
