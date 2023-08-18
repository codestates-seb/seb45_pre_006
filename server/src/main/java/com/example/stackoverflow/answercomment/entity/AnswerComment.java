package com.example.stackoverflow.answercomment.entity;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AnswerComment extends AnswerBaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerComment_id;
    @Column(columnDefinition = "TEXT")
    private String answerComment_content;

    @ManyToOne
    @JoinColumn(name = "ANSWER_ID",nullable = false)
    private Answer answer;

    public void setAnswer(Answer answer){
        this.answer = answer;
    }

}
