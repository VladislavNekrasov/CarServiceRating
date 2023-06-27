package com.example.FoodOrdering.exception;

public class MasterNotFoundException extends Exception{
    public MasterNotFoundException() {
        super();
    }

    public MasterNotFoundException(String message) {
        super(message);
    }

    public MasterNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MasterNotFoundException(Throwable cause) {
        super(cause);
    }

    protected MasterNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
