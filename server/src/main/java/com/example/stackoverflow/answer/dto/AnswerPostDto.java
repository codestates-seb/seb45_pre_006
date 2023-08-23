package com.example.stackoverflow.answer.dto;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerPostDto {
    private Long userId;
    private Long question_id;
    private String answer_content;
    private Long answerComment_id;

    /** 클라이언트쪽에서 받은 questionId로 Question 객체 생성 **/
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
