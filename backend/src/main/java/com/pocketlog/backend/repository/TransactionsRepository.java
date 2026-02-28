package com.pocketlog.backend.repository;

import com.pocketlog.backend.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Long> {
    @Query("SELECT SUM(t.amount) FROM Transactions t WHERE t.type = 'income'")
    Long sumTotalIncome();

    @Query("SELECT SUM(t.amount) FROM Transactions t WHERE t.type = 'expense'")
    Long sumTotalExpense();
}
