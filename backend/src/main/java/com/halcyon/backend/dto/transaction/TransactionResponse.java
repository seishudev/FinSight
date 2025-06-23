package com.halcyon.backend.dto.transaction;

import com.halcyon.backend.model.support.TransactionType;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record TransactionResponse(
        Long id,
        BigDecimal amount,
        TransactionType type,
        LocalDate date,
        String comment,
        Long categoryId,
        String categoryName,
        Instant createdAt
) {
}
