package com.halcyon.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "FinSight API",
                version = "1.0.0",
                description = "API для финансового приложения FinSight."
        ),
        tags = {
                @Tag(name = "Authentication", description = "Эндпоинты для регистрации, входа и управления токенами"),
                @Tag(name = "Categories", description = "Управление пользовательскими категориями"),
                @Tag(name = "Transactions", description = "Управление транзакциями пользователя (доходы/расходы)"),
                @Tag(name = "Analytics", description = "Аналитика по финансам пользователя"),
                @Tag(name = "Budgets", description = "Управление бюджетами и лимитами по категориям расходов"),
                @Tag(name = "AI Assistant", description = "Взаимодействие с AI-помощником"),
                @Tag(name = "OCR", description = "Распознавание чеков")
        }
)
@SecuritySchemes({
        @SecurityScheme(
                name = "accessTokenCookie",
                type = SecuritySchemeType.APIKEY,
                in = SecuritySchemeIn.COOKIE,
                paramName = "accessToken",
                description = "JWT Access Token для аутентификации. Устанавливается автоматически после входа."
        ),
        @SecurityScheme(
                name = "refreshTokenCookie",
                type = SecuritySchemeType.APIKEY,
                in = SecuritySchemeIn.COOKIE,
                paramName = "refreshToken",
                description = "JWT Refresh Token для обновления access токена. Устанавливается автоматически после входа."
        )
})
public class OpenAPIConfig {
}
