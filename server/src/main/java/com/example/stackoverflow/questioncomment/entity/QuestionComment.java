package com.example.stackoverflow.questioncomment.entity;

import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.user.entity.User;
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

    /** user - questionComment 매핑 **/
    @ManyToOne
    @JoinColumn(name = "USER_ID",nullable = false)
    private User user;

    public void setUser(User user) {
        this.user = user;
    }
}
