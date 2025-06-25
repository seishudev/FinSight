package com.halcyon.backend.dto.receipt;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.halcyon.backend.dto.category.CategoryResponse;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class ParsedTransactionResponse {

    private BigDecimal amount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;

    private String comment;
    private CategoryResponse suggestedCategory;
    private List<CategoryResponse> allExpenseCategories;
}
