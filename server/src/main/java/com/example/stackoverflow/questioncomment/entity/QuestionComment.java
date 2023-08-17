package com.example.stackoverflow.questioncomment.entity;

import com.example.stackoverflow.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuestionComment extends QuestionBaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionComment_id;
    @Column(columnDefinition = "TEXT")
    private String questionComment_content;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID",nullable = false)
    private Question question;

    public void setQuestion(Question question){
        this.question = question;
    }
}
