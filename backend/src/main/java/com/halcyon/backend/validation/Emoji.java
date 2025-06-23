package com.halcyon.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmojiValidator.class)
public @interface Emoji {
    String message() default "Icon must be a valid emoji.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
