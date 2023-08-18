package com.example.stackoverflow.questioncomment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class QuestionCommentResponseDto {

    private long questionComment_id;
    private String questionComment_content;
    private LocalDateTime questionComment_createdAt;
    private LocalDateTime questionComment_modifiedAt;
}
