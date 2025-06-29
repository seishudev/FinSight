package com.halcyon.backend.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class AnalyticsSummaryItemResponse {

    private String type;
    private BigDecimal amount;
}
