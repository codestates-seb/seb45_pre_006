package com.example.stackoverflow.question.repository;

import com.example.stackoverflow.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {
    /** 최신순으로 질문 리스트 정렬 **/
    @Query("SELECT q FROM Question q ORDER BY q.question_createdAt DESC")
    Page<Question> findAllByOrderByQuestionCreatedAtDesc(Pageable pageable);

    /** 키워드로 검색 후 최신순으로 질문 리스트 정렬 **/
    @Query("SELECT q FROM Question q WHERE LOWER(q.question_title) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY q.question_createdAt DESC")
    Page<Question> findByQuestionTitleContainingIgnoreCase(String keyword, Pageable pageable);

    /** 답변이 있으면 최신순으로 질문 리스트 정렬 **/
    @Query("SELECT q FROM Question q WHERE q.question_answerCount > 0 ORDER BY q.question_createdAt DESC")
    Page<Question> findByQuestionAnswerCountIsNotEmpty(Pageable pageable);

}
