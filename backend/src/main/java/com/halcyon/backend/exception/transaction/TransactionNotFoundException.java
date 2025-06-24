package com.halcyon.backend.exception.transaction;

import com.halcyon.backend.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TransactionNotFoundException extends ApiException {

    public TransactionNotFoundException(String message) {
        super(message);
    }
}
