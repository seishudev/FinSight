package com.halcyon.backend.mapper;

import com.halcyon.backend.dto.transaction.CreateTransactionRequest;
import com.halcyon.backend.dto.transaction.TransactionResponse;
import com.halcyon.backend.model.Category;
import com.halcyon.backend.model.Transaction;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(target = "id", ignore = true)
    Transaction toEntity(CreateTransactionRequest request);

    @Mapping(target = "categoryId", expression = "java(category.getId())")
    @Mapping(target = "categoryName", expression = "java(category.getName())")
    TransactionResponse toResponse(Transaction transaction, @Context Category category);
}
