package com.halcyon.backend.model.support;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum BudgetPeriod {

    WEEKLY,
    MONTHLY,
    YEARLY;

    @JsonCreator
    public static BudgetPeriod fromValue(String value) {
        return switch (value.toLowerCase()) {
            case "weekly" -> WEEKLY;
            case "monthly" -> MONTHLY;
            case "yearly" -> YEARLY;
            default -> throw new IllegalArgumentException("Unknown budget period: " + value);
        };
    }

    @JsonValue
    public String toValue() {
        return name().toLowerCase();
    }
}
