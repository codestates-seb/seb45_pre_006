package com.example.stackoverflow.questioncomment.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class QuestionCommentResponseDto {

    private long questionComment_id;
    private String questionComment_content;
    private LocalDateTime questionComment_createdAt;
    private LocalDateTime questionComment_modifiedAt;
}
