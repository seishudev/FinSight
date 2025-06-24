package com.halcyon.backend.dto.transaction;

import com.halcyon.backend.model.support.TransactionType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateTransactionRequest {

    @NotNull(message = "Amount cannot be empty")
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotNull(message = "Transaction type cannot be empty")
    private TransactionType type;

    @NotNull(message = "Date cannot be empty")
    @PastOrPresent(message = "Transaction date cannot be in the future.")
    private LocalDate date;

    @Size(max = 255, message = "Comment cannot exceed 255 characters.")
    private String comment;

    @NotNull(message = "Category ID must be specified")
    private Long categoryId;
}
