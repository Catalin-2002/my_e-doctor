package com.unihack.myedoctor.exception;

public class HealthReportNotFoundException extends RuntimeException{
    public HealthReportNotFoundException(String message) {
        super(message);
    }
}
