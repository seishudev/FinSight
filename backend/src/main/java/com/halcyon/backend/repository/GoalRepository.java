package com.halcyon.backend.repository;

import com.halcyon.backend.model.Goal;
import com.halcyon.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findAllByUser(User user);
    boolean existsByName(String name);
}
