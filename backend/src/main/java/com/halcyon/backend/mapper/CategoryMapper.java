package com.halcyon.backend.mapper;

import com.halcyon.backend.dto.category.CategoryResponse;
import com.halcyon.backend.dto.category.CreateCategoryRequest;
import com.halcyon.backend.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    @Mapping(target = "id", ignore = true)
    Category toEntity(CreateCategoryRequest request);

    CategoryResponse toResponse(Category category);
    List<CategoryResponse> toResponseList(List<Category> categories);
}
