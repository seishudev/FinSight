package com.halcyon.backend.dto.transaction;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.halcyon.backend.model.support.TransactionType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Data
public class TransactionResponse {
    private Long id;
    private BigDecimal amount;
    private TransactionType type;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;

    private String comment;
    private Long categoryId;
    private String categoryName;
    private Instant createdAt;
}
