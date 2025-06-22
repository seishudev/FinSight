package com.halcyon.backend.exception.handler;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
public class ValidationErrorsResponse {

    @JsonProperty("timestamp")
    private Instant timestamp = Instant.now();

    @JsonProperty("status")
    private int status;

    @JsonProperty("errors")
    private List<Map<String, String>> errors;

    public ValidationErrorsResponse(int status, List<Map<String, String>> errors) {
        this.status = status;
        this.errors = errors;
    }
}
