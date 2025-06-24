package com.halcyon.backend.exception.category;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidCategoryException extends ApiException {

    public InvalidCategoryException(String message) {
        super(message);
    }
}
