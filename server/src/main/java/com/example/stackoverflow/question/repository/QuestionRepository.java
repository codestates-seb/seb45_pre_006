package com.example.stackoverflow.question.repository;

import com.example.stackoverflow.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {
    /** 최신순으로 질문 리스트 정렬 **/
    @Query("SELECT q FROM Question q ORDER BY q.question_createdAt DESC")
    Page<Question> findAllByOrderByQuestionCreatedAtDesc(Pageable pageable);

    /** 키워드로 검색 후 최신순으로 질문 리스트 정렬 **/
    @Query("SELECT q FROM Question q WHERE LOWER(q.question_title) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY q.question_createdAt DESC")
    Page<Question> findByQuestionTitleContainingIgnoreCase(@Param("keyword")String keyword, Pageable pageable);

    /** 답변이 있으면 최신순으로 질문 리스트 정렬 **/
    @Query("SELECT q FROM Question q WHERE q.question_answerCount > 0 ORDER BY q.question_createdAt DESC")
    Page<Question> findByQuestionAnswerCountIsNotEmpty(Pageable pageable);

    // 회원 id 가 userId 인 질문들을 찾아 답글 수로 정렬하고 limit 10
    @Query("SELECT q FROM Question q WHERE q.user.id = :userId ORDER BY q.question_answerCount DESC")
    Page<Question> findByQuestionTopQuestions(@Param("userId") Long userId, Pageable pageable);
  
    @Modifying
    @Query("update Question q set q.question_viewCount = :question_viewCount where q.question_id = :question_id")
    int updateViewCount(@Param("question_viewCount") int question_viewCount, @Param("question_id") Long question_id);

}
