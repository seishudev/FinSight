package com.halcyon.backend.mapper;

import com.halcyon.backend.dto.budget.BudgetResponse;
import com.halcyon.backend.dto.budget.CreateBudgetRequest;
import com.halcyon.backend.model.Budget;
import com.halcyon.backend.model.Category;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BudgetMapper {

    @Mapping(target = "id", ignore = true)
    Budget toEntity(CreateBudgetRequest request);

    @Mapping(target = "categoryId", expression = "java(category.getId())")
    @Mapping(target = "categoryName", expression = "java(category.getName())")
    BudgetResponse toResponse(Budget budget, @Context Category category);
}
