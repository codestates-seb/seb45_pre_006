package com.example.stackoverflow.answercomment.dto;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class AnswerCommentPostDto {
    private Long userId;
    private Long answer_id;
    private String answerComment_content;
    public Answer getAnswer() {
        Answer answer = new Answer();
        answer.setAnswer_id(answer_id);
        return answer;
    }

    public User getUser(){
        User user = new User();
        user.setUserId(userId);
        return user;
    }
}

