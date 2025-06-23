package com.halcyon.backend.exception.category;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class CategoryLimitReachedException extends ApiException {

    public CategoryLimitReachedException(String message) {
        super(message);
    }
}
