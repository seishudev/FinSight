package com.halcyon.backend.service;

import com.halcyon.backend.dto.budget.BudgetResponse;
import com.halcyon.backend.dto.budget.CreateBudgetRequest;
import com.halcyon.backend.exception.AccessDeniedException;
import com.halcyon.backend.exception.budget.BudgetAlreadyExistsException;
import com.halcyon.backend.exception.budget.BudgetNotFoundException;
import com.halcyon.backend.exception.category.InvalidCategoryException;
import com.halcyon.backend.mapper.BudgetMapper;
import com.halcyon.backend.model.Budget;
import com.halcyon.backend.model.Category;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.repository.BudgetRepository;
import com.halcyon.backend.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final UserService userService;
    private final CategoryService categoryService;
    private final BudgetMapper budgetMapper;

    @Transactional
    public BudgetResponse create(CreateBudgetRequest request) {
        User user = userService.getCurrentUser();
        Category category = categoryService.getUserCategory(request.getCategoryId());

        isValidCreateRequest(user, category, request);

        Budget budget = budgetMapper.toEntity(request);
        budget.setUser(user);
        budget.setCategory(category);

        budget = budgetRepository.save(budget);

        return mapToBudgetResponse(budget);
    }

    private void isValidCreateRequest(User user, Category category, CreateBudgetRequest request) {
        if (category.getType() != TransactionType.EXPENSE) {
            throw new InvalidCategoryException("You can create a budget only for expense categories.");
        }

        if (budgetRepository.existsByUserAndCategoryAndPeriod(user, category, request.getPeriod())) {
            throw new BudgetAlreadyExistsException("Budget with this category and period already exists.");
        }
    }

    private BudgetResponse mapToBudgetResponse(Budget budget) {
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endDate = today.with(TemporalAdjusters.lastDayOfMonth());

        switch (budget.getPeriod()) {
            case WEEKLY -> {
                startDate = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
                endDate = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
            }
            case YEARLY -> {
                startDate = today.with(TemporalAdjusters.firstDayOfYear());
                endDate = today.with(TemporalAdjusters.lastDayOfYear());
            }
        }

        BigDecimal spentAmount = transactionRepository.findTotalExpensesForCategoryInPeriod(
                budget.getUser(), budget.getCategory(), startDate, endDate
        );

        BigDecimal limitAmount = budget.getLimitAmount();
        BigDecimal remainingAmount = limitAmount.subtract(spentAmount);

        double percentageUsed = 0.0;

        if (limitAmount.compareTo(BigDecimal.ZERO) > 0) {
            percentageUsed = spentAmount
                    .divide(limitAmount, 4, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100"))
                    .doubleValue();
        }

        BudgetResponse response = budgetMapper.toResponse(budget, budget.getCategory());
        response.setSpentAmount(spentAmount);
        response.setRemainingAmount(remainingAmount);
        response.setPercentageUsed(percentageUsed);

        return response;
    }

    @Transactional(readOnly = true)
    public List<BudgetResponse> getUserBudgets() {
        User user = userService.getCurrentUser();
        List<Budget> budgets = budgetRepository.findAllByUser(user);

        return budgets.stream()
                .map(this::mapToBudgetResponse)
                .toList();
    }

    @Transactional
    public void delete(Long budgetId) {
        User user = userService.getCurrentUser();
        Budget budget = findById(budgetId);

        if (!budget.getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not have permissions to delete this budget.");
        }

        budgetRepository.delete(budget);
    }

    private Budget findById(Long budgetId) {
        return budgetRepository.findById(budgetId)
                .orElseThrow(() -> new BudgetNotFoundException("Budget with id " + budgetId + " not found."));
    }
}
