package com.halcyon.backend.exception.goal;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class GoalNotFoundException extends ApiException {

    public GoalNotFoundException(String message) {
        super(message);
    }
}
