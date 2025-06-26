package com.halcyon.backend.mapper;

import com.halcyon.backend.dto.ai.AiChatResponse;
import com.halcyon.backend.model.AiChatMessage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AiChatMessageMapper {

    AiChatResponse toResponse(AiChatMessage message);
}
