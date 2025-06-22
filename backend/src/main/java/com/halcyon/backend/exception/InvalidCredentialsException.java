package com.halcyon.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidCredentialsException extends ApiException {

    public InvalidCredentialsException(String message) {
        super(message);
    }
}
