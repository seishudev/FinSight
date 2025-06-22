package com.halcyon.backend.exception.handler;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.halcyon.backend.exception.ApiException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorDetailsResponse> handleApiException(ApiException e) {
        ResponseStatus responseStatus = e.getClass().getAnnotation(ResponseStatus.class);
        HttpStatus status = responseStatus != null ? responseStatus.value() : HttpStatus.INTERNAL_SERVER_ERROR;
        String message = e.getMessage() != null ? e.getMessage() : "Unknown Error";

        var errorDetails = new ErrorDetailsResponse(
                status.value(),
                e.getClass().getSimpleName(),
                message
        );

        return new ResponseEntity<>(errorDetails, status);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorDetailsResponse> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        HttpStatus status = HttpStatus.METHOD_NOT_ALLOWED;
        String message = e.getMessage() != null ? e.getMessage() : "Method not supported";

        var errorDetails = new ErrorDetailsResponse(
                status.value(),
                e.getClass().getSimpleName(),
                message
        );

        return new ResponseEntity<>(errorDetails, status);
    }

    @ExceptionHandler({
            MethodArgumentNotValidException.class,
            ConstraintViolationException.class,
            MethodArgumentTypeMismatchException.class,
            HttpMessageNotReadableException.class
    })
    public ResponseEntity<ValidationErrorsResponse> handleValidationExceptions(Exception ex) {
        List<Map<String, String>> errors = switch (ex) {
            case MethodArgumentNotValidException methodArgumentNotValidException ->
                    getMethodArgumentNotValidErrors(methodArgumentNotValidException);
            case ConstraintViolationException constraintViolationException ->
                    getConstraintViolationErrors(constraintViolationException);
            case MethodArgumentTypeMismatchException methodArgumentTypeMismatchException ->
                    getMethodArgumentTypeMismatchErrors(methodArgumentTypeMismatchException);
            case HttpMessageNotReadableException httpMessageNotReadableException ->
                    getJsonParseErrors(httpMessageNotReadableException);
            case null, default -> Collections.emptyList();
        };

        ValidationErrorsResponse validationErrorsResponse = new ValidationErrorsResponse(
                HttpStatus.BAD_REQUEST.value(),
                errors
        );

        return ResponseEntity.badRequest().body(validationErrorsResponse);
    }

    private List<Map<String, String>> getMethodArgumentNotValidErrors(MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getFieldErrors().stream()
                .map(error -> {
                    Map<String, String> errorMap = new HashMap<>();
                    errorMap.put("field", toSnakeCase(error.getField()));
                    errorMap.put("message", error.getDefaultMessage() != null ? error.getDefaultMessage() : "Unknown error");
                    return errorMap;
                })
                .sorted(Comparator.comparing(map -> map.get("field")))
                .collect(Collectors.toList());
    }

    private String toSnakeCase(String original) {
        if (original == null) return null;
        return original.replaceAll("([a-z])([A-Z]+)", "$1_$2").toLowerCase();
    }

    private List<Map<String, String>> getConstraintViolationErrors(ConstraintViolationException ex) {
        return ex.getConstraintViolations().stream()
                .map(error -> {
                    Map<String, String> errorMap = new HashMap<>();
                    errorMap.put("field", toSnakeCase(error.getPropertyPath().toString()));
                    errorMap.put("message", error.getMessage());
                    return errorMap;
                })
                .sorted(Comparator.comparing(map -> map.get("field")))
                .collect(Collectors.toList());
    }

    private List<Map<String, String>> getMethodArgumentTypeMismatchErrors(MethodArgumentTypeMismatchException ex) {
        String parameter = ex.getName();
        String requiredType = ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "Unknown";
        String message = String.format("Invalid value '%s' for parameter '%s'. Expected type: '%s'",
                ex.getValue(), parameter, requiredType);

        return List.of(Map.of("field", toSnakeCase(parameter), "message", message));
    }

    private List<Map<String, String>> getJsonParseErrors(HttpMessageNotReadableException ex) {
        Throwable cause = ex.getCause();

        if (cause instanceof InvalidFormatException ife) {
            String fieldName = ife.getPath().stream()
                    .map(ref -> ref.getFieldName() != null ? ref.getFieldName() : "")
                    .collect(Collectors.joining("."));

            String message = String.format("Invalid value '%s' for field '%s'", ife.getValue(), fieldName);

            if (ife.getTargetType() != null && ife.getTargetType().isEnum()) {
                String expectedValues = Arrays.stream(ife.getTargetType().getEnumConstants())
                        .map(Object::toString)
                        .collect(Collectors.joining(", "));
                message += ". Expected one of: " + expectedValues;
            }

            return List.of(Map.of("field", fieldName, "message", message));
        } else {
            return List.of(Map.of("field", "unknown", "message", "Invalid JSON format or unexpected value"));
        }
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorDetailsResponse> handleNoHandlerFoundException(NoResourceFoundException e, HttpServletRequest request) {
        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                HttpStatus.NOT_FOUND.value(),
                "NoResourceFound",
                "Endpoint " + request.getRequestURI() + " not found"
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetailsResponse> handleAllExceptions(Exception e) {
        log.error(e.getMessage(), e);

        ErrorDetailsResponse errorDetails = new ErrorDetailsResponse(
                HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                "InternalServerError",
                "Something went wrong"
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
