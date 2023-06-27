package com.example.FoodOrdering.exception;

public class CarServiceNotFoundException extends Exception{
    public CarServiceNotFoundException() {
        super();
    }

    public CarServiceNotFoundException(String message) {
        super(message);
    }

    public CarServiceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CarServiceNotFoundException(Throwable cause) {
        super(cause);
    }

    protected CarServiceNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
