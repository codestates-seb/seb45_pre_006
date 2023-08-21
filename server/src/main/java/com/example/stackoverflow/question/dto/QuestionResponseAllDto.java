package com.example.stackoverflow.question.dto;

import com.example.stackoverflow.answer.dto.AnswerResponseDto;
import com.example.stackoverflow.answercomment.dto.AnswerCommentResponseDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentResponseDto;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import com.example.stackoverflow.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class QuestionResponseAllDto {

    private Long question_id;

    private Long userId;

    private String displayName;

    private String question_title;

    private String question_content;

    private LocalDateTime question_createdAt;

    private LocalDateTime question_modifiedAt;

    private int question_answerCount;

    private int question_viewCount;

    private List<QuestionCommentResponseDto> questionCommentList;

    private List<AnswerResponseDto> answerList;

    public void setUser(User user){
        this.userId = user.getUserId();
        this.displayName = user.getDisplayName();
    }
}
