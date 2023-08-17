package com.example.stackoverflow.questioncomment.controller;

import com.example.stackoverflow.dto.MultiResponseDto;
import com.example.stackoverflow.dto.SingleResponseDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentPatchDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentPostDto;
import com.example.stackoverflow.questioncomment.dto.QuestionCommentResponseDto;
import com.example.stackoverflow.questioncomment.entity.QuestionComment;
import com.example.stackoverflow.questioncomment.mapper.QuestionCommentMapper;
import com.example.stackoverflow.questioncomment.repository.QuestionCommentRepository;
import com.example.stackoverflow.questioncomment.service.QuestionCommentService;
import org.springframework.data.domain.Page;
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
public class QuestionCommentController {
    private QuestionCommentService questionCommentService;
    private QuestionCommentMapper questionCommentMapper;

    public QuestionCommentController(QuestionCommentService questionCommentService, QuestionCommentMapper questionCommentMapper) {
        this.questionCommentService = questionCommentService;
        this.questionCommentMapper = questionCommentMapper;
    }
    @PostMapping
    public ResponseEntity postQuestionComment(@Valid @RequestBody QuestionCommentPostDto questionCommentPostDto){

        QuestionComment questionComment = questionCommentService.createQuestionComment(questionCommentMapper.questionCommentPostDtoToQuestionComment(questionCommentPostDto));
        QuestionCommentResponseDto response = questionCommentMapper.questionCommentToResponseDto(questionComment);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }
    @PatchMapping("/{question-comment-id}")
    public ResponseEntity patchQuestionComment(@PathVariable("question-comment-id")@Positive long questionComment_Id,
                                               @Valid @RequestBody QuestionCommentPatchDto questionCommentPatchDto){
        questionCommentPatchDto.setQuestionComment_Id(questionComment_Id);
        QuestionComment questionComment =  questionCommentService.updateQuestionComment(questionCommentMapper.questionCommentPatchDtoToQuestionComment(questionCommentPatchDto));

        return new ResponseEntity(
                new SingleResponseDto<>(questionCommentMapper.questionCommentToResponseDto(questionComment)),HttpStatus.OK
        );
    }
    @GetMapping()
    public ResponseEntity getQuestionComment(){
        List<QuestionComment> questionComments = questionCommentService.findQuestionComments();
        return new ResponseEntity<>(
                new SingleResponseDto<>(questionCommentMapper.questionCommentToResponseDtos(questionComments)),HttpStatus.OK
        );
    }
    @DeleteMapping("/{question-comments-id}")
    public ResponseEntity deleteQuestionComment (@PathVariable("question-comments-id")@Positive long questionComment_Id){
        questionCommentService.deleteQuestionComment(questionComment_Id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
