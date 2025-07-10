package com.example.payment_service.controller;

import com.example.payment_service.model.PaymentLog;
import com.example.payment_service.model.PaymentTransaction;
import com.example.payment_service.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/{transactionId}/logs")
    public ResponseEntity<List<PaymentLog>> getLogs(@PathVariable UUID transactionId) {
        List<PaymentLog> logs = paymentService.getTransactionLogs(transactionId);
        return ResponseEntity.ok(logs);
    }
}