package com.example.stackoverflow.question.entity;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
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
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long question_id;

    private String question_title;

    private String question_content;

    @Column(nullable = false)
    private Long question_viewCount = 0L;

    @Column(nullable = false)
    private int question_answerCount = 0;

    @Column(name = "CREATED_AT")
    private LocalDateTime question_createdAt;

    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime question_modifiedAt;

    @PrePersist
    public void prePersist() {
        question_createdAt = LocalDateTime.now();
        question_modifiedAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Answer> answerList = new ArrayList<>();

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<QuestionComment> questionCommentList = new ArrayList<>();

    /** user - question 매핑 **/
    @ManyToOne
    @JoinColumn(name = "USER_ID",nullable = false)
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

    /** 답변 작성하면 질문의 answerList에도 반영되어야함 **/
    public void setAnswerList(Answer answer) {
        this.answerList.add(answer);
    }

    /** 질문 댓글 작성하면 질문의 questionCommentList에도 반영되어야 함 **/
    public void setQuestionCommentList(QuestionComment questionComment){
        this.questionCommentList.add(questionComment);
    }

    /** 질문에 답변 작성하면 answerCount 증가 **/
    public int incrementAnswerCount() {
        return ++question_answerCount;
    }

    /** 질문에 답변 삭제하면 answerCount 감소 **/
    public int decrementAnswerCount(){
        return --question_answerCount;
    }

    /**
     * 질문 조회하면 viewCount 증가
     **/
    public long incrementViewCount() { return ++question_viewCount;}

    @Override
    public String toString() {
        return "Question{" +
                "question_id=" + question_id +
                ", question_title='" + question_title + '\'' +
                ", question_content='" + question_content + '\'' +
                ", question_viewCount=" + question_viewCount +
                ", question_answerCount=" + question_answerCount +
                ", question_createdAt=" + question_createdAt +
                ", question_modifiedAt=" + question_modifiedAt +
                ", answerList=" + answerList +
                ", questionCommentList=" + questionCommentList +
                ", user=" + user +
                '}';
    }
}

