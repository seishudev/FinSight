package com.halcyon.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.Instant;

@Data
public class SuccessResponse {

    @JsonProperty("timestamp")
    private Instant timestamp = Instant.now();

    @JsonProperty("status")
    private int status;

    @JsonProperty("message")
    private String message;

    public SuccessResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public SuccessResponse(String message) {
        this.status = HttpStatus.OK.value();
        this.message = message;
    }
}
