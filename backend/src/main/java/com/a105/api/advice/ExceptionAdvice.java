package com.a105.api.advice;

import com.a105.api.response.DefaultResponse;
import com.a105.api.response.ResponseCode;
import com.a105.exception.BadRequestException;
import com.a105.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    protected DefaultResponse<?> handleBadRequestException(BadRequestException e){
        return DefaultResponse.of(ResponseCode.AUTHENTICATION_ERROR, e.getMessage());
    }

    @ExceptionHandler({ResourceNotFoundException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    protected DefaultResponse<?> handleResourceNotFoundException(BadRequestException e){
        return DefaultResponse.of(ResponseCode.RESOURCE_NOT_FOUND, e.getMessage());
    }

}
