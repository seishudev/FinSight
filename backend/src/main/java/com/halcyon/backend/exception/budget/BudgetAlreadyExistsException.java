package com.halcyon.backend.exception.budget;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class BudgetAlreadyExistsException extends ApiException {

    public BudgetAlreadyExistsException(String message) {
        super(message);
    }
}
