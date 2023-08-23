package com.example.stackoverflow.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class QuestionTopDto {
    private Long question_id;
    private String question_title;
    private int question_answerCount;
    private LocalDateTime createdAt;
}
