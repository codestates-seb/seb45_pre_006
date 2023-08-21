package com.example.stackoverflow.answer.entity;

import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.user.entity.User;
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

    @Column(name = "created_at", updatable = false)
    private LocalDateTime answer_createdAt;

    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime answer_modifiedAt;

    @PrePersist
    public void prePersist() {
        answer_createdAt = LocalDateTime.now();
        answer_modifiedAt = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID",nullable = false)
    private Question question;

    /** user - answer 매핑 **/
    @ManyToOne
    @JoinColumn(name = "USER_ID",nullable = false)
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

    @OneToMany(mappedBy = "answer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<AnswerComment> answerCommentList = new ArrayList<>();

    public void setQuestion(Question question) {
        this.question = question;
    }

    public void setAnswerCommentList(AnswerComment answerComment){
        this.answerCommentList.add(answerComment);
    }


    /** 답변 추천하면 추천 수 증가 **/
    public int incrementRecommendation() {
        return ++answer_recommendation;
    }

    /** 답변 추천 취소하면  추천 수 감소 **/
    public int decrementRecommendation(){
        return --answer_recommendation;
    }

}


