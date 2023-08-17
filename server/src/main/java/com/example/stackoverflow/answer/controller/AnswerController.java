package com.example.stackoverflow.answer.controller;

import com.example.stackoverflow.answer.dto.AnswerPatchDto;
import com.example.stackoverflow.answer.dto.AnswerPostDto;
import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.answer.mapper.AnswerMapper;
import com.example.stackoverflow.answer.service.AnswerService;
import com.example.stackoverflow.dto.SingleResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@CrossOrigin
@RestController
@RequestMapping("/answers")
public class AnswerController {

   private final AnswerService answerService;
   private final AnswerMapper mapper;


    public AnswerController(AnswerService answerService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }

    /** ✅답변 작성(Create) **/
    @PostMapping
    public ResponseEntity postAnswer(@RequestBody AnswerPostDto answerPostDto){
        Answer answer = answerService.createAnswer(mapper.answerPostDtoToAnswer(answerPostDto));

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.CREATED);
    }

    /** ✅답변 조회(Read) **/
    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id")@Positive long answer_id){
        Answer answer = answerService.readAnswer(answer_id);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer),HttpStatus.OK);
    }

    /** ✅답변 수정(Update) **/
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answer_id,
                                      @RequestBody AnswerPatchDto answerPatchDto){
        answerPatchDto.setAnswer_id(answer_id);
        Answer answer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(answerPatchDto));

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer),HttpStatus.OK);

    }

    /** ✅답변 삭제(Delete) **/
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answer_id){
        answerService.deleteAnswer(answer_id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /** ✅답변 채택 **/
    @PostMapping("/{answer-id}/accept")
    public ResponseEntity acceptAnswer(@PathVariable("answer-id")@Positive long answer_id){
        Answer answer = answerService.acceptAnswer(answer_id);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer),HttpStatus.OK);
    }

    /** ✅답변 채택 취소 **/
    @PostMapping("/{answer-id}/unaccept")
    public ResponseEntity unAcceptAnswer(@PathVariable("answer-id") @Positive long answer_id){
        Answer answer = answerService.unacceptAnswer(answer_id);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    /** ✅답변 추천 **/
    @PostMapping("/{answer-id}/recommend")
    public ResponseEntity recommendAnswer(@PathVariable("answer-id")@Positive long answerId){
        Answer answer = answerService.recommendAnswer(answerId);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    /** ✅답변 추천 취소 **/
    @PostMapping("/{answer-id}/unrecommend")
    public ResponseEntity unRecommendAnswer(@PathVariable("answer-id")@Positive long answerId){
        Answer answer = answerService.unrecommendAnswer(answerId);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }
}
