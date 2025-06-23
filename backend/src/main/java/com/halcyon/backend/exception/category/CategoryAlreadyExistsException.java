package com.halcyon.backend.exception.category;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class CategoryAlreadyExistsException extends ApiException {

    public CategoryAlreadyExistsException(String message) {
        super(message);
    }
}
