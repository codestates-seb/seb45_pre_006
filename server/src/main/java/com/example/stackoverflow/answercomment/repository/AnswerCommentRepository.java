package com.example.stackoverflow.answercomment.repository;

import com.example.stackoverflow.answercomment.entity.AnswerComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AnswerCommentRepository extends JpaRepository<AnswerComment,Long> {
    @Query(value = "SELECT a FROM AnswerComment a WHERE a.answerComment_Id = :answerComment_Id")
    Optional<AnswerComment> findByAnswerComment(Long answerComment_Id);
}
