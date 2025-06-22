package com.halcyon.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.halcyon.backend.exception.handler.ErrorDetailsResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;

@Component
@RequiredArgsConstructor
public class CustomAuthEntryPoint implements AuthenticationEntryPoint {

    private static final String INVALID_TOKEN_ERROR = "InvalidToken";
    private static final String INVALID_TOKEN_MESSAGE = "Token is missing, invalid, expired, or revoked";

    private final ObjectMapper objectMapper;

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException {
        var errorDetails = new ErrorDetailsResponse(
                HttpStatus.UNAUTHORIZED.value(),
                INVALID_TOKEN_ERROR,
                INVALID_TOKEN_MESSAGE
        );

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        try (OutputStream outputStream = response.getOutputStream()) {
            objectMapper.writeValue(outputStream, errorDetails);
        }
    }
}
