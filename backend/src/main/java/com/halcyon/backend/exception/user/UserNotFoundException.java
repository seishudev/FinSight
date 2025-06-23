package com.halcyon.backend.exception.user;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserNotFoundException extends ApiException {

    public UserNotFoundException(String message) {
        super(message);
    }
}
