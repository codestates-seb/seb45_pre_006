package com.example.stackoverflow.user.entity;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.audit.Auditable;
import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false) // 암호화로 인한 문자열 길이 설정
    private String password;

    @Column(nullable = false)
    private String displayName;

    @Column(length = 1000)
    private String aboutMe;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    // img 의 url 저장
    private String img;

    // 내가 작성한 QuestionList
    /* user - question 매핑 */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Question> questionList = new ArrayList<>();

    public void setQuestionList(Question question) {
        this.questionList.add(question);
    }

    /** user - answer 매핑 **/
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Answer> answerList = new ArrayList<>();

    public void setAnswerList(Answer answer) {
        this.answerList.add(answer);
    }

    /** user - questionComment 매핑 **/
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<QuestionComment> questionCommentList = new ArrayList<>();

    public void setQuestionCommentList(QuestionComment questionComment) {
        this.questionCommentList.add(questionComment);
    }

    /** user - answerComment 매핑 **/
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<AnswerComment> answerCommentList = new ArrayList<>();

    public void setAnswerCommentList(AnswerComment answerComment) {
        this.answerCommentList.add(answerComment);
    }
}

