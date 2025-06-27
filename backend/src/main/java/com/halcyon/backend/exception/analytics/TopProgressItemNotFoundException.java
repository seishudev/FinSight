package com.halcyon.backend.exception.analytics;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TopProgressItemNotFoundException extends ApiException {

    public TopProgressItemNotFoundException(String message) {
        super(message);
    }
}
