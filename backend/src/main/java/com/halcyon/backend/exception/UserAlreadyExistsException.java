package com.halcyon.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends ApiException {

    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
