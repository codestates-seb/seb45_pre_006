package com.example.stackoverflow.answercomment.controller;

import com.example.stackoverflow.answercomment.dto.AnswerCommentPatchDto;
import com.example.stackoverflow.answercomment.dto.AnswerCommentPostDto;
import com.example.stackoverflow.answercomment.dto.AnswerCommentResponseDto;
import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.answercomment.mapper.AnswerCommentMapper;
import com.example.stackoverflow.answercomment.service.AnswerCommentService;
import com.example.stackoverflow.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/answer-comments")
@Validated
public class AnswerCommentController {
    private AnswerCommentService answerCommentService;
    private AnswerCommentMapper answerCommentMapper;

    public AnswerCommentController(AnswerCommentService answerCommentService, AnswerCommentMapper answerCommentMapper) {
        this.answerCommentService = answerCommentService;
        this.answerCommentMapper = answerCommentMapper;
    }
    @PostMapping
    public ResponseEntity postAnswerComment(@Valid @RequestBody AnswerCommentPostDto answerCommentPostDto){
        AnswerComment answerComment = answerCommentService.createAnswerComment(answerCommentMapper.answerCommentPostDtoToAnswer(answerCommentPostDto));
        AnswerCommentResponseDto response = answerCommentMapper.answerCommentToAnswerCommentResponseDto(answerComment);
        return new ResponseEntity (response,HttpStatus.CREATED);
    }
    @PatchMapping("/{answer-comment-id}")
    public ResponseEntity patchAnswerComment(@PathVariable("answer-comment-id")@Positive long answerComment_id,
                                             @Valid @RequestBody AnswerCommentPatchDto answerCommentPatchDto){
        answerCommentPatchDto.setAnswerComment_id(answerComment_id);
        AnswerComment answerComment = answerCommentService.updateAnswerComment(answerCommentMapper.answerCommentPatchDtoToAnswer(answerCommentPatchDto));
        return new ResponseEntity(
                new SingleResponseDto<>(answerCommentMapper.answerCommentToAnswerCommentResponseDto(answerComment)), HttpStatus.OK
        );
    }
    @GetMapping
    public ResponseEntity getAnswerComments(){
        List<AnswerComment> answerComments = answerCommentService.findAnswerComments();
        return new ResponseEntity(
                new SingleResponseDto<>(answerCommentMapper.answerCommentToAnswerCommentResponseDtos(answerComments)),HttpStatus.OK);
    }
    @DeleteMapping("/{answer-comment-id}")
    public ResponseEntity deleteAnswerComment(@PathVariable("answer-comment-id")@Positive long answerComment_id){
        answerCommentService.deleteAnswerComment(answerComment_id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

