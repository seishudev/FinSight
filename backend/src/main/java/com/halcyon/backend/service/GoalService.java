package com.halcyon.backend.service;

import com.halcyon.backend.dto.goal.AddFundsToGoalRequest;
import com.halcyon.backend.dto.goal.CreateGoalRequest;
import com.halcyon.backend.dto.goal.GoalResponse;
import com.halcyon.backend.exception.AccessDeniedException;
import com.halcyon.backend.exception.goal.GoalAlreadyExistsException;
import com.halcyon.backend.exception.goal.GoalNotFoundException;
import com.halcyon.backend.exception.goal.GoalUpdateException;
import com.halcyon.backend.mapper.GoalMapper;
import com.halcyon.backend.model.Goal;
import com.halcyon.backend.model.User;
import com.halcyon.backend.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserService userService;
    private final GoalMapper goalMapper;

    @Transactional
    public GoalResponse create(CreateGoalRequest request) {
        User user = userService.getCurrentUser();

        if (goalRepository.existsByName(request.getName())) {
            throw new GoalAlreadyExistsException("Goal with name " + request.getName() + " already exists.");
        }

        Goal goal = goalMapper.toEntity(request);
        goal.setUser(user);

        goal = goalRepository.save(goal);
        return mapToGoalResponse(goal);
    }

    private GoalResponse mapToGoalResponse(Goal goal) {
        BigDecimal targetAmount = goal.getTargetAmount();
        BigDecimal currentAmount = goal.getCurrentAmount();
        BigDecimal remainingAmount = targetAmount.subtract(currentAmount);

        double percentage = 0.0;
        if (targetAmount.compareTo(BigDecimal.ZERO) > 0) {
            percentage = currentAmount
                    .divide(targetAmount, 4, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100"))
                    .doubleValue();
        }

        boolean isOverdue = goal.getTargetDate() != null && goal.getTargetDate().isBefore(LocalDate.now());
        LocalDate startDate = goal.getCreatedAt()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();

        GoalResponse response = goalMapper.toResponse(goal);
        response.setStartDate(startDate);
        response.setRemainingAmount(remainingAmount);
        response.setPercentage(percentage);
        response.setOverdue(isOverdue);

        return response;
    }

    @Transactional(readOnly = true)
    public List<GoalResponse> getAllForCurrentUser() {
        User user = userService.getCurrentUser();
        return goalRepository.findAllByUser(user).stream()
                .map(this::mapToGoalResponse)
                .toList();
    }

    @Transactional
    public GoalResponse addFunds(Long goalId, AddFundsToGoalRequest request) {
        User user = userService.getCurrentUser();
        Goal goal = findGoalByIdAndCheckOwnership(goalId, user);

        if (goal.getTargetDate() != null && goal.getTargetDate().isBefore(LocalDate.now())) {
            throw new GoalUpdateException("You can't top up a goal because its deadline has already passed.");
        }

        BigDecimal newCurrentAmount = goal.getCurrentAmount().add(request.getAmount());

        if (newCurrentAmount.compareTo(BigDecimal.ZERO) < 0) {
            throw new GoalUpdateException("Current amount cannot be negative.");
        }

        if (newCurrentAmount.compareTo(goal.getTargetAmount()) > 0) {
            newCurrentAmount = goal.getTargetAmount();
        }

        goal.setCurrentAmount(newCurrentAmount);
        goal = goalRepository.save(goal);
        return mapToGoalResponse(goal);
    }

    private Goal findGoalByIdAndCheckOwnership(Long goalId, User user) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new GoalNotFoundException("Goal with id " + goalId + " not found."));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not have permission to access this goal.");
        }

        return goal;
    }

    @Transactional
    public void delete(Long goalId) {
        Goal goal = findGoalByIdAndCheckOwnership(goalId, userService.getCurrentUser());
        goalRepository.delete(goal);
    }
}
