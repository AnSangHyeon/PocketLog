package com.pocketlog.backend.repository;

import com.pocketlog.backend.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Long> {
    @Query("SELECT SUM(t.amount) FROM Transactions t WHERE t.type = 'income'")
    Long sumTotalIncome();

    @Query("SELECT SUM(t.amount) FROM Transactions t WHERE t.type = 'expense'")
    Long sumTotalExpense();

    @Query("""
        SELECT t FROM Transactions t 
        WHERE YEAR(t.date) = :year 
          AND MONTH(t.date) = :month 
          AND (:type = 'all' OR t.type = :type) 
          AND (:category = 'all' OR t.category = :category)
    """)
    List<Transactions> findByFilters(
        @Param("year") int year,
        @Param("month") int month,
        @Param("type") String type,
        @Param("category") String category
    );
}
