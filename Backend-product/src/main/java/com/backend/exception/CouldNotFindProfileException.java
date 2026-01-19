package com.backend.exception;

public class CouldNotFindProfileException extends RuntimeException{

    public CouldNotFindProfileException(String message) {
    super(message);
    }
}
