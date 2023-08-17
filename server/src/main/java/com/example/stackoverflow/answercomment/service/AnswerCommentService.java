package com.example.stackoverflow.answercomment.service;

import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.answercomment.repository.AnswerCommentRepository;
import com.example.stackoverflow.exeception.BusinessLogicException;
import com.example.stackoverflow.exeception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerCommentService {
    private final AnswerCommentRepository answerCommentRepository;

    public AnswerCommentService(AnswerCommentRepository answerCommentRepository) {
        this.answerCommentRepository = answerCommentRepository;
    }
    public AnswerComment createAnswerComment(AnswerComment answerComment){
        return answerCommentRepository.save(answerComment);
    }
    public AnswerComment updateAnswerComment(AnswerComment answerComment){
        AnswerComment findAnswerComment = findVerifiesAnswerComment(answerComment.getAnswerComment_Id());
        Optional.ofNullable(answerComment.getAnswerComment_Content())
                .ifPresent(answerComment_Content -> findAnswerComment.setAnswerComment_Content(answerComment_Content));
        return answerCommentRepository.save(findAnswerComment);
    }
    public List<AnswerComment> findAnswerComments(){
        return answerCommentRepository.findAll();
    }
//    public AnswerComment findAnswerComment(long answerCommentId){
//        return findVerifiesAnswerComment(answerCommentId);
//    }
    public void deleteAnswerComment(long answerComment_Id){
        AnswerComment answerComment = findVerifiesAnswerComment(answerComment_Id);
        answerCommentRepository.delete(answerComment);
    }
    public AnswerComment findVerifiesAnswerComment(long answerComment_Id) {
        Optional<AnswerComment> optionalAnswerComment = answerCommentRepository.findByAnswerComment(answerComment_Id);
        AnswerComment findAnswerComment =
                optionalAnswerComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWERCOMMENT_NOT_FOUND));

        return findAnswerComment;
    }
}
