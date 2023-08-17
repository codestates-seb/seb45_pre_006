package com.example.stackoverflow.questioncomment.service;

import com.example.stackoverflow.exeception.BusinessLogicException;
import com.example.stackoverflow.exeception.ExceptionCode;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import com.example.stackoverflow.questioncomment.repository.QuestionCommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionCommentService {
    private final QuestionCommentRepository questionCommentRepository;

    public QuestionCommentService(QuestionCommentRepository questionCommentRepository) {
        this.questionCommentRepository = questionCommentRepository;
    }
    public QuestionComment createQuestionComment(QuestionComment questionComment){
        return questionCommentRepository.save(questionComment);
    }
    public QuestionComment updateQuestionComment(QuestionComment questionComment){
        QuestionComment findquestioncomment = findVerifiedQuestionComment(questionComment.getQuestionComment_Id());
        Optional.ofNullable(questionComment.getQuestionComment_Content())
                .ifPresent(questionComment_Content -> findquestioncomment.setQuestionComment_Content(questionComment_Content));
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
}
