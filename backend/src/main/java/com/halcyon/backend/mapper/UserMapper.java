package com.halcyon.backend.mapper;

import com.halcyon.backend.dto.auth.SignRequest;
import com.halcyon.backend.model.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", expression = "java(passwordEncoder.encode(request.getPassword()))")
    User toEntity(SignRequest request, @Context PasswordEncoder passwordEncoder);
}
