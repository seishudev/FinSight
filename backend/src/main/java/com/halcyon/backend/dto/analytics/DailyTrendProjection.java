package com.halcyon.backend.dto.analytics;

import com.halcyon.backend.model.support.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class DailyTrendProjection {

    private LocalDate date;
    private TransactionType type;
    private BigDecimal totalAmount;
}
