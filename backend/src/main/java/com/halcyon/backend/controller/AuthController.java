package com.halcyon.backend.controller;

import com.halcyon.backend.dto.SuccessResponse;
import com.halcyon.backend.dto.auth.AuthResponse;
import com.halcyon.backend.dto.auth.SignRequest;
import com.halcyon.backend.exception.handler.ErrorDetailsResponse;
import com.halcyon.backend.exception.handler.ValidationErrorsResponse;
import com.halcyon.backend.jwt.JwtProvider;
import com.halcyon.backend.security.CookieManager;
import com.halcyon.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
@Tag(name = "Authentication", description = "Эндпоинты для регистрации, входа и управления токенами")
public class AuthController {

    private final AuthService authService;
    private final JwtProvider jwtProvider;
    private final CookieManager cookieManager;

    @Operation(summary = "Регистрация нового пользователя", description = "Создает нового пользователя и автоматически аутентифицирует его, устанавливая access и refresh токены в HttpOnly куки.") // 2. Описываем эндпоинт
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Пользователь успешно зарегистрирован и вошел в систему",
                    headers = {
                            @Header(name = "Set-Cookie", description = "Устанавливает HttpOnly куки: `accessToken` и `refreshToken`.")
                    },
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = SuccessResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Невалидные данные в запросе (например, некорректный email)",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ValidationErrorsResponse.class))),
            @ApiResponse(responseCode = "409", description = "Пользователь с таким email уже существует",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
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

    @Operation(summary = "Вход пользователя в систему", description = "Аутентифицирует пользователя по email и паролю. В случае успеха устанавливает `accessToken` и `refreshToken` в защищенные HttpOnly куки.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успешный вход. Токены установлены в куки.",
                    headers = {
                            @Header(name = "Set-Cookie", description = "Устанавливает HttpOnly куки: `accessToken` и `refreshToken`.")
                    },
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = SuccessResponse.class))),
            @ApiResponse(responseCode = "400", description = "Невалидные данные в запросе.",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ValidationErrorsResponse.class))),
            @ApiResponse(responseCode = "401", description = "Ошибка аутентификации (неверный логин или пароль).",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
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

    @Operation(summary = "Обновление access токена", description = "Использует `refreshToken` из HttpOnly куки для получения нового `accessToken`.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Токен успешно обновлен. Новый `accessToken` установлен в куки.",
                    headers = {
                            @Header(name = "Set-Cookie", description = "Устанавливает HttpOnly куки: новый `accessToken`.")
                    },
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = SuccessResponse.class))),
            @ApiResponse(responseCode = "401", description = "Refresh токен отсутствует, невалиден или просрочен.",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ErrorDetailsResponse.class)))
    })
    @PostMapping("/refresh")
    public ResponseEntity<Object> getAccessToken(HttpServletRequest request, HttpServletResponse response) {
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

    @Operation(summary = "Выход пользователя из системы", description = "Очищает HttpOnly куки с токенами на стороне клиента.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успешный выход из системы. Куки очищены.",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = SuccessResponse.class)))
    })
    @PostMapping("/logout")
    public ResponseEntity<SuccessResponse> logout(HttpServletResponse response) {
        response.addCookie(cookieManager.clearTokenCookie(false));
        response.addCookie(cookieManager.clearTokenCookie(true));

        var successResponse = new SuccessResponse("Logout successful.");
        return ResponseEntity.ok(successResponse);
    }
}
