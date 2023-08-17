package com.example.stackoverflow.questioncomment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionCommentPatchDto {
    private long questionComment_id;
    private String questionComment_content;
}
