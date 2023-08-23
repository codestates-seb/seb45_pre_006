package com.example.stackoverflow.questioncomment.service;

import com.example.stackoverflow.exeception.BusinessLogicException;
import com.example.stackoverflow.exeception.ExceptionCode;
import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.question.repository.QuestionRepository;
import com.example.stackoverflow.question.service.QuestionService;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import com.example.stackoverflow.questioncomment.repository.QuestionCommentRepository;
import com.example.stackoverflow.user.entity.User;
import com.example.stackoverflow.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionCommentService {
    private final QuestionRepository questionRepository;
    private final QuestionCommentRepository questionCommentRepository;

    private final UserRepository userRepository;

    public QuestionCommentService(QuestionRepository questionRepository, QuestionCommentRepository questionCommentRepository, UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.questionCommentRepository = questionCommentRepository;
        this.userRepository = userRepository;
    }

    public QuestionComment createQuestionComment(QuestionComment questionComment){
        User user = verifyExistingUser(questionComment.getUser().getUserId());
        questionComment.setUser(user);
        user.setQuestionCommentList(questionComment);
        Question question = findVerifiedQuestion(questionComment.getQuestion().getQuestion_id());
        questionComment.setQuestion(question);
        question.setQuestionCommentList(questionComment);

        return questionCommentRepository.save(questionComment);
    }
    public QuestionComment updateQuestionComment(QuestionComment questionComment){
        QuestionComment findquestioncomment = findVerifiedQuestionComment(questionComment.getQuestionComment_id());
        Optional.ofNullable(questionComment.getQuestionComment_content())
                .ifPresent(questionComment_Content -> findquestioncomment.setQuestionComment_content(questionComment_Content));
        return questionCommentRepository.save(findquestioncomment);
    }
    public List<QuestionComment> findQuestionComments(){
        return questionCommentRepository.findAll();
    }
    public void deleteQuestionComment(long questionComment_Id){
        QuestionComment questionComment =findVerifiedQuestionComment(questionComment_Id);
        questionCommentRepository.delete(questionComment);
    }
    public QuestionComment findVerifiedQuestionComment(long questionComment_Id){
        Optional<QuestionComment> optionalQuestionComment = questionCommentRepository.findByQuestionComment(questionComment_Id);
        QuestionComment findQuestionComment =
                optionalQuestionComment.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.QUESTIONCOMMENT_NOT_FOUND));
        return findQuestionComment;
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
