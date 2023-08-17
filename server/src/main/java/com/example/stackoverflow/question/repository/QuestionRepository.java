package com.example.stackoverflow.question.repository;

import com.example.stackoverflow.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {

    @Query("SELECT q FROM Question q ORDER BY q.question_createdAt DESC")
    Page<Question> findAllByOrderByQuestionCreatedAtDesc(Pageable pageable);

    @Query("SELECT q FROM Question q WHERE LOWER(q.question_title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Question> findByQuestionTitleContainingIgnoreCase(String keyword, Pageable pageable);

    @Query("SELECT q FROM Question q WHERE q.question_answerCount > 0")
    Page<Question> findByQuestionAnswerCountIsNotEmpty(Pageable pageable);

}
