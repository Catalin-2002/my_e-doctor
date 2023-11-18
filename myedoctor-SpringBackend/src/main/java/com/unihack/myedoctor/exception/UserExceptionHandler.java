package com.unihack.myedoctor.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(value = {UserNotFoundException.class})
    public ResponseEntity<Object> userNotFoundException(UserNotFoundException userNotFoundException) {
        UserException userException = new UserException(
                userNotFoundException.getMessage(),
                HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(userException, HttpStatus.BAD_REQUEST);
    }
}
