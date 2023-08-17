package com.example.stackoverflow.answer.dto;

import com.example.stackoverflow.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerPostDto {
    private Long question_id;
    private String answer_content;

    /** 클라이언트쪽에서 받은 questionId로 Question 객체 생성 **/
    public Question getQuestion(){
        Question question = new Question();
        question.setQuestion_id(question_id);
        return question;
    }
}
