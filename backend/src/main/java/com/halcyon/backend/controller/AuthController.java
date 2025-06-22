package com.halcyon.backend.controller;

import com.halcyon.backend.dto.SuccessResponse;
import com.halcyon.backend.dto.auth.AuthResponse;
import com.halcyon.backend.dto.auth.SignRequest;
import com.halcyon.backend.exception.handler.ErrorDetailsResponse;
import com.halcyon.backend.jwt.JwtProvider;
import com.halcyon.backend.security.CookieManager;
import com.halcyon.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtProvider jwtProvider;
    private final CookieManager cookieManager;

    @PostMapping("/sign-up")
    public ResponseEntity<SuccessResponse> signUp(
            @RequestBody @Valid SignRequest signRequest,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.signUp(signRequest);
        addTokenCookies(response, authResponse);

        var successResponse = new SuccessResponse(
                HttpStatus.CREATED.value(), "User registered successfully."
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
    }

    private void addTokenCookies(HttpServletResponse response, AuthResponse authResponse) {
        response.addCookie(cookieManager.createTokenCookie(
                authResponse.accessToken(),
                false)
        );

        response.addCookie(cookieManager.createTokenCookie(
                authResponse.refreshToken(),
                true)
        );
    }

    @PostMapping("/sign-in")
    public ResponseEntity<SuccessResponse> signIn(
            @RequestBody @Valid SignRequest signRequest,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.signIn(signRequest);
        addTokenCookies(response, authResponse);

        var successResponse = new SuccessResponse("Login successful.");
        return ResponseEntity.ok(successResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Object> getAccessToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Optional<String> refreshTokenOpt = cookieManager.getTokenFromCookie(request, true);

        if (refreshTokenOpt.isEmpty() || !jwtProvider.isValidToken(refreshTokenOpt.get(), true)) {
            return handleInvalidRefreshToken();
        }

        AuthResponse authResponse = authService.getTokensByRefresh(refreshTokenOpt.get(), true);
        response.addCookie(cookieManager.createTokenCookie(
                authResponse.accessToken(),
                false)
        );

        var successResponse = new SuccessResponse("Token refreshed successfully.");
        return ResponseEntity.ok(successResponse);
    }

    private ResponseEntity<Object> handleInvalidRefreshToken() {
        var errorDetails = new ErrorDetailsResponse(
                HttpStatus.UNAUTHORIZED.value(),
                "InvalidRefreshToken",
                "Refresh token is missing, invalid, expired, or revoked"
        );

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorDetails);
    }

    @PostMapping("/logout")
    public ResponseEntity<SuccessResponse> logout(HttpServletResponse response) {
        response.addCookie(cookieManager.clearTokenCookie(false));
        response.addCookie(cookieManager.clearTokenCookie(true));

        var successResponse = new SuccessResponse("Logout successful.");
        return ResponseEntity.ok(successResponse);
    }
}
