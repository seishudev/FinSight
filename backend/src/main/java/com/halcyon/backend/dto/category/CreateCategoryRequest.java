package com.halcyon.backend.dto.category;

import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.validation.Emoji;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateCategoryRequest {

    @NotBlank(message = "Category name cannot be empty.")
    @Size(min = 1, max = 50, message = "Category name must be between 1 and 50 characters.")
    private String name;

    @NotBlank(message = "Category icon cannot be empty.")
    @Emoji
    private String icon;

    @NotNull(message = "Category type is required.")
    private TransactionType type;
}
