package com.halcyon.backend.filter;

import com.halcyon.backend.jwt.JwtAuthentication;
import com.halcyon.backend.jwt.JwtProvider;
import com.halcyon.backend.security.CookieManager;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AuthFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final CookieManager cookieManager;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        Optional<String> jwtTokenOptional = cookieManager.getTokenFromCookie(request, false);
        boolean isRefresh = false;

        if (jwtTokenOptional.isPresent() && jwtProvider.isValidToken(jwtTokenOptional.get(), isRefresh)) {
            String jwtToken = jwtTokenOptional.get();
            Claims claims = jwtProvider.extractAllClaims(jwtToken, isRefresh);

            var jwtAuthentication = new JwtAuthentication();
            jwtAuthentication.setAuthenticated(true);
            jwtAuthentication.setEmail(claims.getSubject());
            jwtAuthentication.setToken(jwtToken);

            SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);
        }

        filterChain.doFilter(request, response);
    }
}
