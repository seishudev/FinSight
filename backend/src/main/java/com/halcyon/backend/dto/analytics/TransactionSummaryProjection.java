package com.halcyon.backend.dto.analytics;

import com.halcyon.backend.model.support.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class TransactionSummaryProjection {

    private TransactionType type;
    private BigDecimal totalAmount;
    private long transactionsCount;
}
