package com.unihack.myedoctor.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class HealthReportExceptionHandler {

    @ExceptionHandler(value = {HealthReportNotFoundException.class})
    public ResponseEntity<Object> healthReportNotFoundException(HealthReportNotFoundException healthReportNotFoundException) {
        HealthReportException userException = new HealthReportException(
                healthReportNotFoundException.getMessage(),
                HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(userException, HttpStatus.BAD_REQUEST);
    }

}
