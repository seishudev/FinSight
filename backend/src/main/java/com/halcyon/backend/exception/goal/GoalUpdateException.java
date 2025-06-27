package com.halcyon.backend.exception.goal;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class GoalUpdateException extends ApiException {

    public GoalUpdateException(String message) {
        super(message);
    }
}
