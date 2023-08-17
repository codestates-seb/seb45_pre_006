package com.example.stackoverflow.question.entity;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
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

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime question_createdAt;

    @LastModifiedDate
    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime question_modifiedAt;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Answer> answerList = new ArrayList<>();

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<QuestionComment> questionCommentList = new ArrayList<>();

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

    /** 질문 조회하면 viewCount 증가 **/
    public Long incrementViewCount() { return ++question_viewCount;}

}

