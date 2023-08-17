package com.example.stackoverflow.question.dto;

import com.example.stackoverflow.answer.dto.AnswerResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class QuestionResponseAllDto {

    private Long question_id;

    private String question_title;

    private String question_content;

    private LocalDateTime question_createdAt;

    private LocalDateTime question_modifiedAt;

    private int question_answerCount;

    private Long question_viewCount;

    private List<AnswerResponseDto> answerList;

}
