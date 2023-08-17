package com.example.stackoverflow.questioncomment.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class QuestionCommentResponseDto {
    private long questionComment_Id;
    private String questionComment_Content;
    private LocalDateTime questionComment_createdAt;
    private LocalDateTime questionComment_modifiedAt;

}
