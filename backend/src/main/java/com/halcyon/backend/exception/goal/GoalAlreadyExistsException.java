package com.halcyon.backend.exception.goal;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class GoalAlreadyExistsException extends ApiException {

    public GoalAlreadyExistsException(String message) {
        super(message);
    }
}
