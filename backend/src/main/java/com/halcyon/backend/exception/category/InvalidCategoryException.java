package com.halcyon.backend.exception.category;

public class InvalidCategoryException extends RuntimeException {
  public InvalidCategoryException(String message) {
    super(message);
  }
}
