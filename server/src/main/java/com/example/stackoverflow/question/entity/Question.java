package com.example.stackoverflow.question.entity;

import com.example.stackoverflow.answer.entity.Answer;
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

    @OneToMany(mappedBy = "question", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Answer> answerList = new ArrayList<>();

    /**
     * Answer를 작성하면 Question의 answerList에도 반영되어야함
     **/
    public void setAnswerList(Answer answer) {
        this.answerList.add(answer);
    }

    /**
     * 질문 작성하면 answerCount 추가
     *
     * @return
     **/
    public int incrementAnswerCount() {
        return ++question_answerCount;
    }

    public int decrementAnswerCount(){
        return --question_answerCount;
    }

    public Long incrementViewCount() { return ++question_viewCount;}

}

