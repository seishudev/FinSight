package com.halcyon.backend.dto.auth;

public record AuthResponse(
        String accessToken,
        String refreshToken
) {
}
