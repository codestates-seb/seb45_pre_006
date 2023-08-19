package com.example.stackoverflow.question.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionPatchDto {

    private Long question_id;

    private String question_title;

    private String question_content;

}
