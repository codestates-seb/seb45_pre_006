package com.example.stackoverflow.answercomment.entity;

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
    private Long answerComment_Id;
    @Column(columnDefinition = "TEXT")
    private String answerComment_Content;

}
