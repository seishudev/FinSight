package com.halcyon.backend.repository;

import com.halcyon.backend.dto.analytics.DailyTrendProjection;
import com.halcyon.backend.dto.analytics.TransactionSummaryProjection;
import com.halcyon.backend.dto.analytics.TypedCategoryAnalyticsProjection;
import com.halcyon.backend.model.Category;
import com.halcyon.backend.model.Transaction;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("""
        SELECT t FROM Transaction t
        WHERE t.user = :user
        AND (:type IS NULL OR t.type = :type)
        AND (:categoryId IS NULL OR t.category.id = :categoryId)
    """)
    Page<Transaction> findUserTransactions(
            @Param("user") User user,
            @Param("type") TransactionType type,
            @Param("categoryId") Long categoryId,
            Pageable pageable
    );

    @Query("SELECT new com.halcyon.backend.dto.analytics.TransactionSummaryProjection(" +
            "t.type, SUM(t.amount), COUNT(t.id))" +
            "FROM Transaction t " +
            "WHERE t.user = :user " +
            "AND t.date BETWEEN :startDate AND :endDate " +
            "GROUP BY t.type")
    List<TransactionSummaryProjection> findSummaryStatsByDateRange(
            @Param("user") User user,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT new com.halcyon.backend.dto.analytics.TypedCategoryAnalyticsProjection(" +
            "t.type, t.category.id, t.category.name, SUM(t.amount)) " +
            "FROM Transaction t " +
            "WHERE t.user = :user " +
            "AND t.date BETWEEN :startDate AND :endDate " +
            "GROUP BY t.type, t.category.id, t.category.name " +
            "ORDER BY t.type, SUM(t.amount) DESC")
    List<TypedCategoryAnalyticsProjection> findCategoryAnalyticsStatsByDateRange(
            @Param("user") User user,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT new com.halcyon.backend.dto.analytics.DailyTrendProjection(" +
            "t.date, t.type, SUM(t.amount)) " +
            "FROM Transaction t " +
            "WHERE t.user = :user " +
            "AND t.date BETWEEN :startDate AND :endDate " +
            "GROUP BY t.date, t.type " +
            "ORDER BY t.date ASC")
    List<DailyTrendProjection> findDailyTrendStatsByDateRange(
            @Param("user") User user,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT COALESCE(SUM(t.amount), 0) " +
            "FROM Transaction t " +
            "WHERE t.user = :user " +
            "AND t.category = :category " +
            "AND t.type = com.halcyon.backend.model.support.TransactionType.EXPENSE " +
            "AND t.date BETWEEN :startDate AND :endDate")
    BigDecimal findTotalExpensesForCategoryInPeriod(
            @Param("user") User user,
            @Param("category") Category category,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
