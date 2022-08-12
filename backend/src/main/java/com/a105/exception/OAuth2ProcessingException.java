package com.a105.exception;

public class OAuth2ProcessingException extends RuntimeException{
    public OAuth2ProcessingException(String message) {
        super(message);
    }

    public OAuth2ProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
