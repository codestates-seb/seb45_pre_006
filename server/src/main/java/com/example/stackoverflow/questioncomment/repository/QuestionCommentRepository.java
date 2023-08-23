package com.example.stackoverflow.questioncomment.repository;

import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QuestionCommentRepository extends JpaRepository<QuestionComment,Long> {
    @Query(value = "SELECT q FROM QuestionComment q WHERE q.questionComment_id = :questionComment_id")
    Optional<QuestionComment> findByQuestionComment(@Param("questionComment_id")long questionComment_id);
}
