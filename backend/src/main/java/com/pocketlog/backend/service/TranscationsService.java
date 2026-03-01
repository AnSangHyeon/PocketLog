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

    public List<Transactions> getFilteredTransactions(int year, int month, String type, String category) {
        return transactionsRepository.findByFilters(year, month, type, category);
    }

    @Transactional // 이게 있어야 DB에 자동으로 저장됩니다!
    public Transactions update(Long id, Transactions newData) {
        Transactions transaction = transactionsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 내역이 없습니다. id=" + id));

        transaction.setAmount(newData.getAmount());
        transaction.setCategory(newData.getCategory());
        transaction.setMemo(newData.getMemo());
        transaction.setDate(newData.getDate());
        transaction.setType(newData.getType());

        return transaction;
    }

    @Transactional
    public void delete(Long id) {
        if (!transactionsRepository.existsById(id)) {
            throw new IllegalArgumentException("삭제하려는 내역이 존재하지 않습니다. id=" + id);
        }
        transactionsRepository.deleteById(id);
    }
}
