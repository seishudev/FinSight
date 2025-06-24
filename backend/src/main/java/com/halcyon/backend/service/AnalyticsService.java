package com.halcyon.backend.service;

import com.halcyon.backend.dto.analytics.*;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final TransactionRepository transactionRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public List<AnalyticsSummaryItemResponse> getSummaryForCurrentMonth() {
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
                new AnalyticsSummaryItemResponse("balance", balance),
                new AnalyticsSummaryItemResponse("income", income),
                new AnalyticsSummaryItemResponse("expense", expense),
                new AnalyticsSummaryItemResponse("transactions", totalTransactions)
        );
    }

    @Transactional(readOnly = true)
    public CategorizedAnalyticsResponse getCategorizedAnalyticsForCurrentMonth() {
        User user = userService.getCurrentUser();

        LocalDate today = LocalDate.now();
        LocalDate startDate = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endDate = today.with(TemporalAdjusters.lastDayOfMonth());

        List<TypedCategoryAnalyticsProjection> projections =
                transactionRepository.findCategoryAnalyticsStatsByDateRange(user, startDate, endDate);

        Map<TransactionType, List<TypedCategoryAnalyticsProjection>> partitionedByType =
                projections.stream()
                        .collect(Collectors.groupingBy(TypedCategoryAnalyticsProjection::getType));

        List<TypedCategoryAnalyticsProjection> incomeProjections =
                partitionedByType.getOrDefault(TransactionType.INCOME, Collections.emptyList());
        List<TypedCategoryAnalyticsProjection> expenseProjections =
                partitionedByType.getOrDefault(TransactionType.EXPENSE, Collections.emptyList());

        BigDecimal totalIncome = incomeProjections.stream()
                .map(TypedCategoryAnalyticsProjection::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = expenseProjections.stream()
                .map(TypedCategoryAnalyticsProjection::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<CategoryAnalyticsResponse> incomeStats = calculateCategoryPercentages(incomeProjections, totalIncome);
        List<CategoryAnalyticsResponse> expenseStats = calculateCategoryPercentages(expenseProjections, totalExpense);

        return new CategorizedAnalyticsResponse(
                totalIncome,
                totalExpense,
                incomeStats,
                expenseStats
        );
    }

    private List<CategoryAnalyticsResponse> calculateCategoryPercentages(
            List<TypedCategoryAnalyticsProjection> projections,
            BigDecimal totalAmount
    ) {
        if (totalAmount.compareTo(BigDecimal.ZERO) == 0) {
            return Collections.emptyList();
        }

        return projections.stream()
                .map(proj -> {
                    double percentage = proj.getTotalAmount()
                            .divide(totalAmount, 4, RoundingMode.HALF_UP)
                            .multiply(new BigDecimal("100"))
                            .doubleValue();

                    return new CategoryAnalyticsResponse(
                        proj.getCategoryId(),
                        proj.getCategoryName(),
                        proj.getTotalAmount(),
                        percentage
                    );
                })
                .toList();
    }
}
