package com.example.stackoverflow.questioncomment.dto;

import com.example.stackoverflow.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionCommentPostDto {
    private Long question_id;
    private String questionComment_content;

    public Question getQuestion(){
        Question question = new Question();
        question.setQuestion_id(question_id);
        return question;
    }
}
