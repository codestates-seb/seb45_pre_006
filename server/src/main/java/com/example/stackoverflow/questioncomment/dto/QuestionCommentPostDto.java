package com.example.stackoverflow.questioncomment.dto;

import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionCommentPostDto {
    private Long userId;
    private Long question_id;
    private String questionComment_content;

    public Question getQuestion(){
        Question question = new Question();
        question.setQuestion_id(question_id);
        return question;
    }

    public User getUser(){
        User user = new User();
        user.setUserId(userId);
        return user;
    }
}
