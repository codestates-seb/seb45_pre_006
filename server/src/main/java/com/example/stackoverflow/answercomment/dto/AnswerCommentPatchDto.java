package com.example.stackoverflow.answercomment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class AnswerCommentPatchDto {
    private long answerComment_id;
    @NotBlank(message = "작성한 내용이 없습니다 작성해주세요")
    private String answerComment_content;

}
