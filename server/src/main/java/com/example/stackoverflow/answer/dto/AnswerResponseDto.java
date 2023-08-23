package com.example.stackoverflow.answer.dto;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.answercomment.dto.AnswerCommentResponseDto;
import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AnswerResponseDto {
    private Long answer_id;
    private Long userId;
    private String displayName;
    private Long question_id;
    private String answer_content;
    private LocalDateTime answer_createdAt;

    private LocalDateTime answer_modifiedAt;

    private Boolean answer_accepted;

    private Integer answer_recommendation;

    private List<AnswerCommentResponseDto> answerCommentList;

    public void setQuestion(Question question){
        this.question_id = question.getQuestion_id();
    }

    public void setUser(User user){
        this.userId = user.getUserId();
        this.displayName = user.getDisplayName();
    }

}
