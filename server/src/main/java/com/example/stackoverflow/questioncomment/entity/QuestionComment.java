package com.example.stackoverflow.questioncomment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuestionComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionComment_Id;
    @Column(columnDefinition = "TEXT")
    private String questionComment_Content;
}
