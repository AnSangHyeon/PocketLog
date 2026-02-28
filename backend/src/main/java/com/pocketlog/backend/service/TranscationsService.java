package com.pocketlog.backend.service;

import com.pocketlog.backend.entity.Transactions;
import com.pocketlog.backend.repository.TransactionsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TranscationsService {
    private final TransactionsRepository transactionsRepository;

    @Transactional
    public Transactions saveTransaction(Transactions transactions) {
        return transactionsRepository.save(transactions);
    }

    public Map<String, Object> getDashboardData() {
        long totalIncome = Optional.ofNullable(transactionsRepository.sumTotalIncome()).orElse(0L);
        long totalExpense = Optional.ofNullable(transactionsRepository.sumTotalExpense()).orElse(0L);

        Map<String, Object> response = new HashMap<>();
        response.put("totalIncome", totalIncome);
        response.put("totalExpense", totalExpense);
        response.put("balance", totalIncome - totalExpense);

        return response;
    }
}
