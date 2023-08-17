package com.example.stackoverflow.questioncomment.dto;

import lombok.Builder;
import lombok.Getter;
@Builder
@Getter
public class QuestionCommentResponseDto {
    private long questionComment_Id;
    private String questionComment_Content;

}
