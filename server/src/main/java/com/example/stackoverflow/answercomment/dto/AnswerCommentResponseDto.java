package com.example.stackoverflow.answercomment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class AnswerCommentResponseDto {
    private long answerComment_Id;
    private String answerComment_Content;
    private LocalDateTime answerComment_createdAt;
    private LocalDateTime answerComment_modifiedAt;

}
