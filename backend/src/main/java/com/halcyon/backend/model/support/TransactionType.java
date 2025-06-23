package com.halcyon.backend.model.support;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TransactionType {
    INCOME,
    EXPENSE;

    @JsonCreator
    public static TransactionType fromValue(String value) {
        return switch (value.toLowerCase()) {
            case "income" -> INCOME;
            case "expense" -> EXPENSE;
            default -> throw new IllegalArgumentException("Unknown transaction type: " + value);
        };
    }

    @JsonValue
    public String toValue() {
        return name().toLowerCase();
    }
}
