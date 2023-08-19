package com.example.stackoverflow.question.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionResponseDto {

    private Long question_id;

    private String question_title;

    private String question_content;

    private int question_viewCount;

    private int question_answerCount;

    private LocalDateTime question_createdAt;

    private LocalDateTime question_modifiedAt;

}
