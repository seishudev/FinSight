package com.halcyon.backend.service;

import com.halcyon.backend.dto.category.CategoryResponse;
import com.halcyon.backend.dto.category.CreateCategoryRequest;
import com.halcyon.backend.dto.category.GroupedCategoryResponse;
import com.halcyon.backend.exception.AccessDeniedException;
import com.halcyon.backend.exception.category.CategoryAlreadyExistsException;
import com.halcyon.backend.exception.category.CategoryLimitReachedException;
import com.halcyon.backend.exception.category.CategoryNotFoundException;
import com.halcyon.backend.mapper.CategoryMapper;
import com.halcyon.backend.model.Category;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserService userService;
    private final CategoryMapper categoryMapper;

    @Transactional
    public CategoryResponse create(CreateCategoryRequest request) {
        User user = userService.getCurrentUser();
        isValidCreateRequest(request, user);

        Category category = categoryMapper.toEntity(request);
        category.setUser(user);

        category = categoryRepository.save(category);

        return categoryMapper.toResponse(category);
    }

    private void isValidCreateRequest(CreateCategoryRequest request, User user) {
        long count = categoryRepository.countByTypeAndUser(request.getType(), user);

        if (count >= 50) {
            throw new CategoryLimitReachedException("You cannot have more than 50 categories of the same type.");
        }

        if (categoryRepository.existsByNameAndTypeAndUser(request.getName(), request.getType(), user)) {
            throw new CategoryAlreadyExistsException("Category with this name and type already exists for the user.");
        }
    }

    @Transactional(readOnly = true)
    public CategoryResponse getById(Long categoryId) {
        Category category = getUserCategory(categoryId);
        return categoryMapper.toResponse(category);
    }

    public Category getUserCategory(Long categoryId) {
        User user = userService.getCurrentUser();
        Category category = findById(categoryId);
        doesUserHavePermission(user, category);

        return category;
    }

    private Category findById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category with id " + categoryId + " not found."));
    }

    @Transactional(readOnly = true)
    public List<GroupedCategoryResponse> getAllByUser() {
        User user = userService.getCurrentUser();
        List<Category> categories = categoryRepository.findAllByUser(user);

        Map<TransactionType, List<Category>> groupedByType = categories.stream()
                .collect(Collectors.groupingBy(Category::getType));

        return groupedByType.entrySet().stream()
                .map(entry -> new GroupedCategoryResponse(
                        entry.getKey(),
                        categoryMapper.toResponseList(entry.getValue())
                ))
                .sorted(Comparator.comparing(GroupedCategoryResponse::type))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllByType(TransactionType type) {
        User user = userService.getCurrentUser();
        List<Category> categories = categoryRepository.findAllByTypeAndUser(type, user);
        return categoryMapper.toResponseList(categories);
    }

    @Transactional
    public CategoryResponse update(Long categoryId, CreateCategoryRequest request) {
        User user = userService.getCurrentUser();

        if (categoryRepository.existsByNameAndTypeAndUserAndIdNot(request.getName(), request.getType(), user, categoryId)) {
            throw new CategoryAlreadyExistsException("Category with this name and type already exists for the user.");
        }

        Category category = findById(categoryId);
        doesUserHavePermission(user, category);

        category.setName(request.getName());
        category.setIcon(request.getIcon());
        category.setType(request.getType());

        category = categoryRepository.save(category);
        return categoryMapper.toResponse(category);
    }

    private void doesUserHavePermission(User user, Category category) {
        if (!category.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not have permission to this category.");
        }
    }

    @Transactional
    public void delete(Long categoryId) {
        User user = userService.getCurrentUser();
        Category category = findById(categoryId);
        doesUserHavePermission(user, category);

        categoryRepository.delete(category);
    }
}
