package com.halcyon.backend.dto.receipt;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class ParsedReceiptData {

    @JsonProperty("total_amount")
    private BigDecimal totalAmount;

    @JsonProperty("suggested_category_id")
    private Long suggestedCategoryId;

    @JsonProperty("items")
    private List<String> items;
}
