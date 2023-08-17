package com.example.stackoverflow.answer.entity;

import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answer_id;

    @Column(length = 100 , nullable = false)
    private String answer_content;

    private Boolean answer_accepted =false;

    private Integer answer_recommendation =0;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime answer_createdAt;

    @LastModifiedDate
    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime answer_modifiedAt;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID",nullable = false)
    private Question question;

    public void setQuestion(Question question) {
        this.question = question;
    }

    public int incrementRecommendation() {
        return ++answer_recommendation;
    }

    public int decrementRecommendation(){
        return --answer_recommendation;
    }
    @OneToMany(mappedBy = "answer", cascade = {CascadeType.ALL})
    private List<AnswerComment> answerCommentList = new ArrayList<>();
    public void setAnswerCommentList(AnswerComment answerComment){
        this.answerCommentList.add(answerComment);
    }
}


