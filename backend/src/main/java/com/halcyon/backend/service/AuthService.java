package com.halcyon.backend.service;

import com.halcyon.backend.dto.auth.AuthResponse;
import com.halcyon.backend.dto.auth.SignRequest;
import com.halcyon.backend.exception.InvalidCredentialsException;
import com.halcyon.backend.exception.UserAlreadyExistsException;
import com.halcyon.backend.jwt.JwtProvider;
import com.halcyon.backend.mapper.UserMapper;
import com.halcyon.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final UserMapper userMapper;

    public AuthResponse signUp(SignRequest signRequest) {
        if (userService.existsByEmail(signRequest.getEmail())) {
            throw new UserAlreadyExistsException("User with email " + signRequest.getEmail() + " already exists");
        }

        User user = userMapper.toEntity(signRequest, passwordEncoder);
        user = userService.save(user);

        return getAuthResponse(user.getEmail());
    }

    private AuthResponse getAuthResponse(String email) {
        String accessToken = jwtProvider.generateToken(email, false);
        String refreshToken = jwtProvider.generateToken(email, true);

        return new AuthResponse(accessToken, refreshToken);
    }

    public AuthResponse signIn(SignRequest signRequest) {
        User user = userService.findByEmail(signRequest.getEmail());

        if (!passwordEncoder.matches(signRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return getAuthResponse(user.getEmail());
    }

    public AuthResponse getTokensByRefresh(String refreshToken, boolean isRefresh) {
        if (!jwtProvider.isValidToken(refreshToken, true)) {
            throw new InvalidCredentialsException("Invalid refresh token");
        }

        String subject = jwtProvider.extractAllClaims(refreshToken, true).getSubject();
        User user = userService.findByEmail(subject);

        String accessToken = jwtProvider.generateToken(user.getEmail(), false);
        String newRefreshToken = isRefresh
                ? jwtProvider.generateToken(user.getEmail(), true)
                : null;

        return new AuthResponse(accessToken, newRefreshToken);
    }
}
