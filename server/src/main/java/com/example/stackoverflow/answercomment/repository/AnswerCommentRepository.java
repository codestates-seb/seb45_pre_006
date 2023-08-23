package com.example.stackoverflow.answercomment.repository;

import com.example.stackoverflow.answercomment.entity.AnswerComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AnswerCommentRepository extends JpaRepository<AnswerComment,Long> {
    @Query(value = "SELECT a FROM AnswerComment a WHERE a.answerComment_id = :answerComment_id")
    Optional<AnswerComment> findByAnswerComment(@Param("answerComment_id")Long answerComment_id);
}
