package com.halcyon.backend.mapper;

import com.halcyon.backend.dto.goal.CreateGoalRequest;
import com.halcyon.backend.dto.goal.GoalResponse;
import com.halcyon.backend.model.Goal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GoalMapper {

    @Mapping(target = "id", ignore = true)
    Goal toEntity(CreateGoalRequest request);

    GoalResponse toResponse(Goal goal);
}
