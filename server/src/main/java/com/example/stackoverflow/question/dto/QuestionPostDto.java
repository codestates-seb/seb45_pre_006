package com.example.stackoverflow.question.dto;

import com.example.stackoverflow.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionPostDto {
    private Long userId;

    private String question_title;

    private String question_content;

    public User getUser(){
        User user = new User();
        user.setUserId(this.userId);
        return user;
    }

}
