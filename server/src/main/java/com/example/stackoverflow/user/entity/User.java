package com.example.stackoverflow.user.entity;

import com.example.stackoverflow.audit.Auditable;
import com.example.stackoverflow.question.entity.Question;
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
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Question> questionList = new ArrayList<>();
    public User(String email, String password, String displayName, List<String> roles, String img){
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.roles = roles;
        this.img = img;
    }

    public void setQuestionList(Question question) {
        questionList.add(question);
    }
}
