package com.halcyon.backend.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;

@Component
public class CookieManager {

    private static final int ACCESS_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;
    private static final int REFRESH_TOKEN_MAX_AGE = 31 * 24 * 60 * 60;

    private static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    public Cookie createTokenCookie(String jwtToken, boolean isRefresh) {
        String name = isRefresh ? REFRESH_TOKEN_COOKIE_NAME : ACCESS_TOKEN_COOKIE_NAME;
        int maxAge = isRefresh ? REFRESH_TOKEN_MAX_AGE : ACCESS_TOKEN_MAX_AGE;

        Cookie cookie = new Cookie(name, jwtToken);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");

        return cookie;
    }

    public Cookie clearTokenCookie(boolean isRefresh) {
        String name = isRefresh ? REFRESH_TOKEN_COOKIE_NAME : ACCESS_TOKEN_COOKIE_NAME;

        Cookie cookie = new Cookie(name, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }

    public Optional<String> getTokenFromCookie(HttpServletRequest request, boolean isRefresh) {
        String cookieName = isRefresh ? REFRESH_TOKEN_COOKIE_NAME : ACCESS_TOKEN_COOKIE_NAME;

        if (request.getCookies() == null) {
            return Optional.empty();
        }

        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookieName.equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }
}
