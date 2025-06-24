package com.halcyon.backend.service;

import com.halcyon.backend.dto.analytics.AnalyticsSummaryItemDto;
import com.halcyon.backend.dto.analytics.TransactionSummaryProjection;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final TransactionRepository transactionRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public List<AnalyticsSummaryItemDto> getSummaryForCurrentMonth() {
        User user = userService.getCurrentUser();

        LocalDate today = LocalDate.now();
        LocalDate startDate = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endDate = today.with(TemporalAdjusters.lastDayOfMonth());

        List<TransactionSummaryProjection> summaries =
                transactionRepository.findSummaryStatsByDateRange(user, startDate, endDate);

        Map<TransactionType, TransactionSummaryProjection> summaryMap = summaries.stream()
                .collect(Collectors.toMap(TransactionSummaryProjection::getType, p -> p));

        var defaultSummary = new TransactionSummaryProjection(null, BigDecimal.ZERO, 0L);

        BigDecimal income = summaryMap.getOrDefault(TransactionType.INCOME, defaultSummary).getTotalAmount();
        BigDecimal expense = summaryMap.getOrDefault(TransactionType.EXPENSE, defaultSummary).getTotalAmount();
        long incomeCount = summaryMap.getOrDefault(TransactionType.INCOME, defaultSummary).getTransactionsCount();
        long expenseCount = summaryMap.getOrDefault(TransactionType.EXPENSE, defaultSummary).getTransactionsCount();

        BigDecimal balance = income.subtract(expense);
        BigDecimal totalTransactions = new BigDecimal(incomeCount + expenseCount);

        return List.of(
                new AnalyticsSummaryItemDto("balance", balance),
                new AnalyticsSummaryItemDto("income", income),
                new AnalyticsSummaryItemDto("expense", expense),
                new AnalyticsSummaryItemDto("transactions", totalTransactions)
        );
    }
}
