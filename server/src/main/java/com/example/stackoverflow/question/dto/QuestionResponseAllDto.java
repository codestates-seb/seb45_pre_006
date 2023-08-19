package com.example.stackoverflow.question.dto;

import com.example.stackoverflow.answer.dto.AnswerResponseDto;
import com.example.stackoverflow.answercomment.dto.AnswerCommentResponseDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentResponseDto;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
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

    private List<QuestionCommentResponseDto> questionCommentList;

    private List<AnswerResponseDto> answerList;


}
