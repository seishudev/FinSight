package com.halcyon.backend.service;

import com.halcyon.backend.dto.analytics.*;
import com.halcyon.backend.dto.budget.BudgetResponse;
import com.halcyon.backend.dto.goal.GoalResponse;
import com.halcyon.backend.exception.analytics.TopProgressItemNotFoundException;
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
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final TransactionRepository transactionRepository;
    private final UserService userService;
    private final BudgetService budgetService;
    private final GoalService goalService;

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

    @Transactional(readOnly = true)
    public List<TrendDataPointResponse> getIncomeExpenseTrendForLast7Days() {
        User user = userService.getCurrentUser();

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);

        List<DailyTrendProjection> projections =
                transactionRepository.findDailyTrendStatsByDateRange(user, startDate, endDate);

        Map<LocalDate, Map<TransactionType, BigDecimal>> dataByDate = projections.stream()
                .collect(Collectors.groupingBy(
                        DailyTrendProjection::getDate,
                        Collectors.toMap(DailyTrendProjection::getType, DailyTrendProjection::getTotalAmount)
                ));

        return IntStream.rangeClosed(0, 6)
                .mapToObj(startDate::plusDays)
                .map(date -> {
                    Map<TransactionType, BigDecimal> dailyData =
                            dataByDate.getOrDefault(date, Collections.emptyMap());

                    return new TrendDataPointResponse(
                            date,
                            dailyData.getOrDefault(TransactionType.INCOME, BigDecimal.ZERO),
                            dailyData.getOrDefault(TransactionType.EXPENSE, BigDecimal.ZERO)
                    );
                })
                .toList();
    }

    @Transactional(readOnly = true)
    public ProgressiveItemResponse getTopProgressItem() {
        Optional<GoalResponse> topGoalOpt = goalService.getAllForCurrentUser().stream()
                .max(Comparator.comparing(GoalResponse::getPercentage));

        Optional<BudgetResponse> topBudgetOpt = budgetService.getUserBudgets().stream()
                .max(Comparator.comparing(BudgetResponse::getPercentageUsed));

        if (topGoalOpt.isEmpty() && topBudgetOpt.isEmpty()) {
            throw new TopProgressItemNotFoundException("The user has no active goals or budgets.");
        }

        if (topGoalOpt.isPresent() && topBudgetOpt.isEmpty()) {
            return buildGoalResponse(topGoalOpt.get());
        }

        if (topGoalOpt.isEmpty()) {
            return buildBudgetResponse(topBudgetOpt.get());
        }

        GoalResponse topGoal = topGoalOpt.get();
        BudgetResponse topBudget = topBudgetOpt.get();

        if (topGoal.getPercentage() >= topBudget.getPercentageUsed()) {
            return buildGoalResponse(topGoal);
        } else {
            return buildBudgetResponse(topBudget);
        }
    }

    private ProgressiveItemResponse buildGoalResponse(GoalResponse goal) {
        return new ProgressiveItemResponse("goal", goal, null);
    }

    private ProgressiveItemResponse buildBudgetResponse(BudgetResponse budget) {
        return new ProgressiveItemResponse("budget", null, budget);
    }
}
