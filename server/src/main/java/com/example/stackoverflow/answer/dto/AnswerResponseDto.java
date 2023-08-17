package com.example.stackoverflow.answer.dto;

import com.example.stackoverflow.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnswerResponseDto {
    private Long answer_id;
    private Long question_id;
    private String answer_content;

    private LocalDateTime answer_createdAt;

    private LocalDateTime answer_modifiedAt;

    private Boolean answer_accepted;

    private Integer answer_recommendation;

    public void setQuestion(Question question){
        this.question_id = question.getQuestion_id();
    }
}
