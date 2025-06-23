package com.halcyon.backend.validation;

import com.vdurmont.emoji.EmojiManager;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmojiValidator implements ConstraintValidator<Emoji, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.isEmpty()) {
            return true;
        }

        return EmojiManager.isEmoji(value);
    }
}
