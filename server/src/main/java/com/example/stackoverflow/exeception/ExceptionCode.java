package com.example.stackoverflow.exeception;

import lombok.Getter;

public enum ExceptionCode {
    ANSWER_NOT_FOUND(404,"Answer not found"),
    QUESTIONCOMMENT_NOT_FOUND(404,"QuestionComment not found"),
    ANSWERCOMMENT_NOT_FOUND(404,"AnswerComment not found");

    @Getter
    private int status;
    @Getter
    private String message;
    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
