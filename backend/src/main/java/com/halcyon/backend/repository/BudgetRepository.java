package com.halcyon.backend.repository;

import com.halcyon.backend.model.Budget;
import com.halcyon.backend.model.Category;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.BudgetPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    boolean existsByUserAndCategoryAndPeriod(User user, Category category, BudgetPeriod period);
}
