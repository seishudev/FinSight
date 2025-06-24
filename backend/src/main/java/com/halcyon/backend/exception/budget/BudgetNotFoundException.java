package com.halcyon.backend.exception.budget;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class BudgetNotFoundException extends ApiException {

    public BudgetNotFoundException(String message) {
        super(message);
    }
}
