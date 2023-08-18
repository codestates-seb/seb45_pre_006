package com.example.stackoverflow.answercomment.dto;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.question.entity.Question;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnswerCommentResponseDto {
    private long answerComment_id;
    private String answerComment_content;
    private LocalDateTime answerComment_createdAt;
    private LocalDateTime answerComment_modifiedAt;

}
