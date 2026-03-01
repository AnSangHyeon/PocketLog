package com.pocketlog.backend.controller;

import com.pocketlog.backend.entity.Transactions;
import com.pocketlog.backend.service.TranscationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AddTransactionsController {
    private final TranscationsService transcationsService;

    @PostMapping("/api/transactions")
    public Transactions addTransaction(@RequestBody Transactions transactions) {
        return transcationsService.saveTransaction(transactions);
    }

    @GetMapping("/api/dashboard")
    public Map<String, Object> getDashboard() {
        return transcationsService.getDashboardData();
    }

    @GetMapping("/api/transactions")
    public List<Transactions> getTransactions(
        @RequestParam int year,
        @RequestParam int month,
        @RequestParam String type,
        @RequestParam String category
    ) {
        return transcationsService.getFilteredTransactions(year, month, type, category);
    }

    @PutMapping("/api/transactions/{id}")
    public ResponseEntity<Transactions> updateTransaction(
        @PathVariable Long id,
        @RequestBody Transactions detail
    ) {
        return ResponseEntity.ok(transcationsService.update(id, detail));
    }

    @DeleteMapping("/api/transactions/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transcationsService.delete(id);
        return ResponseEntity.ok().build();
    }
}
