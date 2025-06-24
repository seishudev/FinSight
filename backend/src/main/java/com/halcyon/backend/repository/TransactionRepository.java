package com.halcyon.backend.repository;

import com.halcyon.backend.dto.analytics.TransactionSummaryProjection;
import com.halcyon.backend.model.Transaction;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
}
