package com.example.stackoverflow.exeception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "User exists"),
    DIFFERENT_PASSWORD(401, "Different Password"),
    COOKIE_NOT_FOUND(401, "Cookie Not Found"),
    BAD_ACCESS(401, "Bad Access"),
    TIME_OUT(401, "Time Out"),
    BAD_TOKEN(401, "Bad Token");
    ANSWER_NOT_FOUND(404,"Answer not found"),
    QUESTIONCOMMENT_NOT_FOUND(404,"QuestionComment not found"),
    ANSWERCOMMENT_NOT_FOUND(404,"AnswerComment not found");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
