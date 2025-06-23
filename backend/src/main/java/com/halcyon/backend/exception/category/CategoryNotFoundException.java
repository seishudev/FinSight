package com.halcyon.backend.exception.category;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CategoryNotFoundException extends ApiException {

    public CategoryNotFoundException(String message) {
        super(message);
    }
}
