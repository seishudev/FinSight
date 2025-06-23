package com.halcyon.backend.service;

import com.halcyon.backend.dto.transaction.CreateTransactionRequest;
import com.halcyon.backend.dto.transaction.TransactionResponse;
import com.halcyon.backend.mapper.TransactionMapper;
import com.halcyon.backend.model.Category;
import com.halcyon.backend.model.Transaction;
import com.halcyon.backend.model.User;
import com.halcyon.backend.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserService userService;
    private final CategoryService categoryService;
    private final TransactionMapper transactionMapper;

    @Transactional
    public TransactionResponse create(CreateTransactionRequest request) {
        User user = userService.getCurrentUser();
        Category category = categoryService.getUserCategory(request.getCategoryId());

        Transaction transaction = transactionMapper.toEntity(request);
        transaction.setUser(user);
        transaction.setCategory(category);

        transaction = transactionRepository.save(transaction);
        return transactionMapper.toResponse(transaction);
    }
}
