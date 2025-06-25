package com.halcyon.backend.mapper;

import com.halcyon.backend.dto.budget.BudgetResponse;
import com.halcyon.backend.dto.budget.CreateBudgetRequest;
import com.halcyon.backend.model.Budget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BudgetMapper {

    @Mapping(target = "id", ignore = true)
    Budget toEntity(CreateBudgetRequest request);

    BudgetResponse toResponse(Budget budget);
}
