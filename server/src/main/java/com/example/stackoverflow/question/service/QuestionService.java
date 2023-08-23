package com.example.stackoverflow.question.service;

import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.question.repository.QuestionRepository;
import com.example.stackoverflow.user.entity.User;
import com.example.stackoverflow.user.repository.UserRepository;
import com.example.stackoverflow.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserService userService;
  
    public QuestionService(QuestionRepository questionRepository,
                            UserService userService) {
        this.questionRepository = questionRepository;
        this.userService = userService;
    }

    /** 질문 작성(Create) **/
    public Question createQuestion(Question question){
        // 회원 찾기
        User user = userService.findVerifiedUser(question.getUser().getUserId());
        // Question 객체에 User 등록
        question.setUser(user);
        // 회원 유저에 존재하는 리스트에 질문 add
        user.setQuestionList(question);
        return questionRepository.save(question);
    }

    /** 전체 질문 조회(Read) **/
    public Page<Question> readQuestions(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return questionRepository.findAllByOrderByQuestionCreatedAtDesc(pageable);
    }

    /** 전체 질문 조회(Read) - 답변 여부로 필터링 **/
    public Page<Question> readQuestionsFilterByAnswer(boolean hasAnswer,int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        if(hasAnswer==true){
            return questionRepository.findByQuestionAnswerCountIsNotEmpty(pageable);
        } else{
            return questionRepository.findAllByOrderByQuestionCreatedAtDesc(pageable);
        }
    }

    /** 선택 질문 조회(Read) **/
    public Question readQuestion(long questionId){
        Question question = questionRepository.findById(questionId).orElse(null);
        question.setQuestion_viewCount(question.incrementViewCount());
        return questionRepository.save(question);
    }

    public Page<Question> findTopQuestions(Long userId){
        // 이미 User 쪽에서 회원을 찾았기 때문에 다시 찾을 필요 없다.
        Pageable pageable = PageRequest.of(0, 10);
        return questionRepository.findByQuestionTopQuestions(userId, pageable);
    }

    /** 질문 수정(Update) **/
    public Question updateQuestion(Question question){
        Question question1 = questionRepository.findById(question.getQuestion_id()).orElse(null);
        question1.setQuestion_title(question.getQuestion_title());
        question1.setQuestion_content(question.getQuestion_content());
        question1.setQuestion_modifiedAt(LocalDateTime.now());

        return questionRepository.save(question1);
    }

    /** 질문 삭제(Delete) **/
    public void deleteQuestion(long questionId){
        questionRepository.deleteById(questionId);
    }

    /** 질문 검색(search) **/
    public Page<Question> searchQuestion(String keyword, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return questionRepository.findByQuestionTitleContainingIgnoreCase(keyword,pageable);
    }

}
