package com.halcyon.backend.model.support;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum MessageRole {

    USER,
    ASSISTANT;

    @JsonCreator
    public static MessageRole fromValue(String value) {
        return switch (value.toLowerCase()) {
            case "user" -> USER;
            case "assistant" -> ASSISTANT;
            default -> throw new IllegalArgumentException("Unknown message role: " + value);
        };
    }

    @JsonValue
    public String toValue() {
        return name().toLowerCase();
    }
}
