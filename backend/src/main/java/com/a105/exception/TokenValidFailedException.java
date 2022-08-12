package com.a105.exception;

public class TokenValidFailedException extends RuntimeException {
    public TokenValidFailedException(String message) {
        super(message);
    }

    public TokenValidFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
