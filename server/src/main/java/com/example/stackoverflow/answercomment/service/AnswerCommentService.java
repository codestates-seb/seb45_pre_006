package com.example.stackoverflow.answercomment.service;

import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.answer.repository.AnswerRepository;
import com.example.stackoverflow.answer.service.AnswerService;
import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.answercomment.repository.AnswerCommentRepository;
import com.example.stackoverflow.exeception.BusinessLogicException;
import com.example.stackoverflow.exeception.ExceptionCode;
import com.example.stackoverflow.question.entity.Question;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerCommentService {
    private final AnswerCommentRepository answerCommentRepository;
    private final AnswerRepository answerRepository;

    public AnswerCommentService(AnswerCommentRepository answerCommentRepository, AnswerRepository answerRepository) {
        this.answerCommentRepository = answerCommentRepository;
        this.answerRepository = answerRepository;
    }

    public AnswerComment createAnswerComment(AnswerComment answerComment){
        Answer answer = findVerifiedAnswer(answerComment.getAnswer().getAnswer_id());
        answerComment.setAnswer(answer);
        answer.setAnswerCommentList(answerComment);
        return answerCommentRepository.save(answerComment);
    }
    public AnswerComment updateAnswerComment(AnswerComment answerComment){
        AnswerComment findAnswerComment = findVerifiesAnswerComment(answerComment.getAnswerComment_id());
        Optional.ofNullable(answerComment.getAnswerComment_content())
                .ifPresent(answerComment_content -> findAnswerComment.setAnswerComment_content(answerComment_content));
        return answerCommentRepository.save(findAnswerComment);
    }
    public List<AnswerComment> findAnswerComments(){
        return answerCommentRepository.findAll();
    }

    public void deleteAnswerComment(long answerComment_id){
        AnswerComment answerComment = findVerifiesAnswerComment(answerComment_id);
        answerCommentRepository.delete(answerComment);
    }
    public AnswerComment findVerifiesAnswerComment(long answerComment_id) {
        Optional<AnswerComment> optionalAnswerComment = answerCommentRepository.findByAnswerComment(answerComment_id);
        AnswerComment findAnswerComment =
                optionalAnswerComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWERCOMMENT_NOT_FOUND));

        return findAnswerComment;
    }
    private Answer findVerifiedAnswer(long answer_id){
        return answerRepository.findById(answer_id).orElse(null);
    }
}
