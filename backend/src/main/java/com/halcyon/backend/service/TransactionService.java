package com.halcyon.backend.service;

import com.halcyon.backend.dto.transaction.CreateTransactionRequest;
import com.halcyon.backend.dto.transaction.TransactionResponse;
import com.halcyon.backend.exception.AccessDeniedException;
import com.halcyon.backend.exception.category.InvalidCategoryException;
import com.halcyon.backend.exception.transaction.TransactionNotFoundException;
import com.halcyon.backend.mapper.TransactionMapper;
import com.halcyon.backend.model.Category;
import com.halcyon.backend.model.Transaction;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

        isValidCategory(request.getType(), category);

        Transaction transaction = transactionMapper.toEntity(request);
        transaction.setUser(user);
        transaction.setCategory(category);

        transaction = transactionRepository.save(transaction);
        return transactionMapper.toResponse(transaction);
    }

    private void isValidCategory(TransactionType transactionType, Category category) {
        if (category.getType() != transactionType) {
            throw new InvalidCategoryException("Transaction type and category type do not match");
        }
    }

    @Transactional(readOnly = true)
    public TransactionResponse getById(Long transactionId) {
        User user = userService.getCurrentUser();
        Transaction transaction = findById(transactionId);

        doesUserHavePermission(transaction, user);

        return transactionMapper.toResponse(transaction);
    }

    private Transaction findById(Long transactionId) {
        return transactionRepository.findById(transactionId)
                .orElseThrow(() -> new TransactionNotFoundException("Transaction with id " + transactionId + " not found"));
    }

    private void doesUserHavePermission(Transaction transaction, User user) {
        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not have permission to this transaction.");
        }
    }

    @Transactional(readOnly = true)
    public Page<TransactionResponse> getHistory(TransactionType type, Long categoryId, Pageable pageable) {
        User user = userService.getCurrentUser();
        Page<Transaction> transactions = transactionRepository.findUserTransactions(user, type, categoryId, pageable);

        return transactions.map(transactionMapper::toResponse);
    }

    @Transactional
    public TransactionResponse update(Long transactionId, CreateTransactionRequest request) {
        User user = userService.getCurrentUser();
        Transaction transaction = findById(transactionId);

        doesUserHavePermission(transaction, user);

        transaction.setType(request.getType());
        transaction.setDate(request.getDate());
        transaction.setComment(request.getComment());

        if (request.getCategoryId() != null) {
            Category category = categoryService.getUserCategory(request.getCategoryId());
            isValidCategory(request.getType(), category);
            transaction.setCategory(category);
        }

        transaction = transactionRepository.save(transaction);
        return transactionMapper.toResponse(transaction);
    }

    @Transactional
    public void delete(Long transactionId) {
        User user = userService.getCurrentUser();
        Transaction transaction = findById(transactionId);
        doesUserHavePermission(transaction, user);

        transactionRepository.delete(transaction);
    }
}