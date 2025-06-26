package com.halcyon.backend.dto.ai;

import com.halcyon.backend.model.support.MessageRole;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class AiChatResponse {

    private Long id;
    private MessageRole role;
    private String content;
    private Instant createdAt;
}
