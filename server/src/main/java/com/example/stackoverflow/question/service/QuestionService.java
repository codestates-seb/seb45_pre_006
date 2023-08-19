package com.example.stackoverflow.question.service;

import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.question.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;


    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    /** 질문 작성(Create) **/
    public Question createQuestion(Question question){
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

    /** 질문 수정(Update) **/
    public Question updateQuestion(Question question){
        Question question1 = questionRepository.findById(question.getQuestion_id()).orElse(null);
        question1.setQuestion_title(question.getQuestion_title());
        question1.setQuestion_content(question.getQuestion_content());

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
