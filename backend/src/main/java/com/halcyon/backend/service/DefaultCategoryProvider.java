package com.halcyon.backend.service;

import com.halcyon.backend.model.Category;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.TransactionType;
import com.halcyon.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DefaultCategoryProvider {

    private final CategoryRepository categoryRepository;

    public void createDefaultCategories(User user) {
        categoryRepository.saveAll(getDefaultCategories(user));
    }

    private List<Category> getDefaultCategories(User user) {
        List<Category> defaultCategories = new ArrayList<>();

        // Expense Categories
        defaultCategories.add(createCategory("Еда", "🍽️", TransactionType.EXPENSE, user));
        defaultCategories.add(createCategory("Транспорт", "🚗", TransactionType.EXPENSE, user));
        defaultCategories.add(createCategory("Развлечения", "🎬", TransactionType.EXPENSE, user));
        defaultCategories.add(createCategory("Покупки", "🛍️", TransactionType.EXPENSE, user));
        defaultCategories.add(createCategory("Здоровье", "💊", TransactionType.EXPENSE, user));
        defaultCategories.add(createCategory("Образование", "📚", TransactionType.EXPENSE, user));
        defaultCategories.add(createCategory("Коммунальные услуги", "🏠", TransactionType.EXPENSE, user));
        defaultCategories.add(createCategory("Другое", "📝", TransactionType.EXPENSE, user));

        // Income Categories
        defaultCategories.add(createCategory("Зарплата", "💰", TransactionType.INCOME, user));
        defaultCategories.add(createCategory("Фриланс", "💻", TransactionType.INCOME, user));
        defaultCategories.add(createCategory("Инвестиции", "📈", TransactionType.INCOME, user));
        defaultCategories.add(createCategory("Подарки", "🎁", TransactionType.INCOME, user));
        defaultCategories.add(createCategory("Другой доход", "💵", TransactionType.INCOME, user));

        return defaultCategories;
    }

    private Category createCategory(String name, String icon, TransactionType type, User user) {
        Category category = new Category();
        category.setName(name);
        category.setIcon(icon);
        category.setType(type);
        category.setUser(user);

        return category;
    }
}
