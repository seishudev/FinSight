package com.halcyon.backend.dto.ai;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(
            shape = JsonFormat.Shape.STRING,
            pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX",
            timezone = "Europe/Moscow"
    )
    private Instant createdAt;
}
