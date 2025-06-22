package com.halcyon.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "FinSight API",
                version = "1.0.0",
                description = "API для финансового приложения FinSight."
        )
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
