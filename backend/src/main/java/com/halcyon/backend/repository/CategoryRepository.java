package com.halcyon.backend.repository;

import com.halcyon.backend.model.Category;
import com.halcyon.backend.model.User;
import com.halcyon.backend.model.support.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByNameAndTypeAndUser(String name, TransactionType type, User user);
    boolean existsByNameAndTypeAndUserAndIdNot(String name, TransactionType type, User user, Long id);

    List<Category> findAllByUser(User user);
    List<Category> findAllByTypeAndUser(TransactionType type, User user);
}
