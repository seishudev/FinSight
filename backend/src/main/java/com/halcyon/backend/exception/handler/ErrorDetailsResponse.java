package com.halcyon.backend.exception.handler;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.Instant;

@Data
public class ErrorDetailsResponse {

    @JsonProperty("timestamp")
    private Instant timestamp = Instant.now();

    @JsonProperty("status")
    private int status;

    @JsonProperty("error")
    private String error;

    @JsonProperty("message")
    private String message;

    public ErrorDetailsResponse(int status, String error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
    }
}
