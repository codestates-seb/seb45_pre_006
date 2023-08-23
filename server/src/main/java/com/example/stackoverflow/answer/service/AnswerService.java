package com.example.stackoverflow.answer.service;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.answer.repository.AnswerRepository;
import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.question.repository.QuestionRepository;
import com.example.stackoverflow.question.service.QuestionService;
import com.example.stackoverflow.user.entity.User;
import com.example.stackoverflow.user.repository.UserRepository;
import com.example.stackoverflow.user.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    private final UserRepository userRepository;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository, UserRepository userRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    /**
     * 답변 작성(Create)
     **/
    public Answer createAnswer(Answer answer) {
        User user = verifyExistingUser(answer.getUser().getUserId());
        answer.setUser(user);
        user.setAnswerList(answer);
        Question question = findVerifiedQuestion(answer.getQuestion().getQuestion_id());
        answer.setQuestion(question);
        question.setAnswerList(answer);
        question.setQuestion_answerCount(answer.getQuestion().incrementAnswerCount());

        return answerRepository.save(answer);
    }

    /**
     * 선택 질문 조회(Read)
     **/
    public Answer readAnswer(long answerId) {
        return answerRepository.findById(answerId).orElse(null);
    }

    /**
     * 답변 수정(Update)
     **/
    public Answer updateAnswer(Answer answer) {
        Answer answer1 = answerRepository.findById(answer.getAnswer_id()).orElse(null);
        answer1.setAnswer_content(answer.getAnswer_content());
        answer1.setAnswer_modifiedAt(LocalDateTime.now());

        return answerRepository.save(answer1);
    }

    /**
     * 답변 삭제(delete)
     **/
    public void deleteAnswer(long answerId) {
        Answer answer = answerRepository.findById(answerId).orElse(null);
        Question question = answer.getQuestion();
        question.setQuestion_answerCount(question.decrementAnswerCount());
        answerRepository.deleteById(answerId);
    }

    /**
     * 답변 채택
     **/
    public Answer acceptAnswer(long answerId) {
        Answer answer = answerRepository.findById(answerId).orElse(null);
        answer.setAnswer_accepted(true);
        return answerRepository.save(answer);
    }

    /**
     * 답변 채택 취소
     **/
    public Answer unacceptAnswer(long answerId) {
        Answer answer = answerRepository.findById(answerId).orElse(null);
        answer.setAnswer_accepted(false);
        return answerRepository.save(answer);
    }

    /**
     * 답변 추천
     **/
    public Answer recommendAnswer(long answerId) {
        Answer answer = answerRepository.findById(answerId).orElse(null);
        answer.setAnswer_recommendation(answer.incrementRecommendation());
        return answerRepository.save(answer);
    }

    /**
     * 답변 추천 취소
     **/
    public Answer unrecommendAnswer(long answerId) {
        Answer answer = answerRepository.findById(answerId).orElse(null);
        if (answer.getAnswer_recommendation() != 0) {
            answer.setAnswer_recommendation(answer.decrementRecommendation());
        }
        return answerRepository.save(answer);
    }

    /**
     * 해당 id의 게시글이 있는지 확인하는 메서드
     **/
    private Question findVerifiedQuestion(long questionId) {
        return questionRepository.findById(questionId).orElse(null);
    }

    private User verifyExistingUser(long userId) {
        return userRepository.findById(userId).orElse(null);
    }

}
