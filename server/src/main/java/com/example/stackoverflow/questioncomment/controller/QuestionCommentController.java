package com.example.stackoverflow.questioncomment.controller;

import com.example.stackoverflow.dto.SingleResponseDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentPatchDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentPostDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentResponseDto;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import com.example.stackoverflow.questioncomment.mapper.QuestionCommentMapper;
import com.example.stackoverflow.questioncomment.service.QuestionCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/question-comments")
@Validated
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class QuestionCommentController {
    private QuestionCommentService questionCommentService;
    private QuestionCommentMapper questionCommentMapper;

    public QuestionCommentController(QuestionCommentService questionCommentService, QuestionCommentMapper questionCommentMapper) {
        this.questionCommentService = questionCommentService;
        this.questionCommentMapper = questionCommentMapper;
    }

    /** 질문 댓글 작성(Create) **/
    @PostMapping
    public ResponseEntity postQuestionComment(@Valid @RequestBody QuestionCommentPostDto questionCommentPostDto){

        QuestionComment questionComment = questionCommentService.createQuestionComment(questionCommentMapper.questionCommentPostDtoToQuestionComment(questionCommentPostDto));
        QuestionCommentResponseDto response = questionCommentMapper.questionCommentToResponseDto(questionComment);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /** 질문 댓글 수정(Update) **/
    @PatchMapping("/{question-comment-id}")
    public ResponseEntity patchQuestionComment(@PathVariable("question-comment-id")@Positive long questionComment_Id,
                                               @Valid @RequestBody QuestionCommentPatchDto questionCommentPatchDto){
        questionCommentPatchDto.setQuestionComment_id(questionComment_Id);
        QuestionComment questionComment =  questionCommentService.updateQuestionComment(questionCommentMapper.questionCommentPatchDtoToQuestionComment(questionCommentPatchDto));

        return new ResponseEntity<>(questionCommentMapper.questionCommentToResponseDto(questionComment),HttpStatus.OK
        );
    }

    /** 질문 댓글 리스트 조회(Read) **/
    @GetMapping
    public ResponseEntity getQuestionComment(){
        List<QuestionComment> questionComments = questionCommentService.findQuestionComments();
        return new ResponseEntity<>(questionCommentMapper.questionCommentToResponseDtos(questionComments),HttpStatus.OK
        );
    }

    /** 질문 댓글 삭제 **/
    @DeleteMapping("/{question-comments-id}")
    public ResponseEntity deleteQuestionComment (@PathVariable("question-comments-id")@Positive long questionComment_Id){
        questionCommentService.deleteQuestionComment(questionComment_Id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
