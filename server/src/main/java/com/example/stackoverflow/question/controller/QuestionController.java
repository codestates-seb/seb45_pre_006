package com.example.stackoverflow.question.controller;


import com.example.stackoverflow.dto.ScrollResponseDto;
import com.example.stackoverflow.question.dto.QuestionPatchDto;
import com.example.stackoverflow.question.dto.QuestionPostDto;
import com.example.stackoverflow.question.dto.QuestionResponseDto;
import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.question.mapper.QuestionMapper;
import com.example.stackoverflow.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;


@RestController
@RequestMapping("/questions")
@Validated
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;


    public QuestionController(QuestionService questionService, QuestionMapper questionMapper) {
        this.questionService = questionService;
        this.mapper = questionMapper;
    }

    /** ✅질문 작성(Create) **/
    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){
        Question question = questionService.createQuestion(mapper.questionPostDtoToQuestion(questionPostDto));
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.CREATED);
    }

    /** ✅전체 질문 조회(Read) - 메인 페이지 **/
    @GetMapping
    public ResponseEntity getQuestions(@RequestParam(name = "page", defaultValue = "0") int page,
                                       @RequestParam(name = "size", defaultValue = "10") int size){
        Page<Question> pageQuestions = questionService.readQuestions(page,size);
        boolean hasNextPage = pageQuestions.hasNext();

        List<Question> questions = pageQuestions.getContent();

        List<QuestionResponseDto> resultQuestions = mapper.listQuestionToListQuestionResponseDto(questions);

        return new ResponseEntity<>(new ScrollResponseDto<>(resultQuestions,hasNextPage),HttpStatus.OK);
    }

    /** ✅전체 질문 조회(Read) - 답변 여부로 필터링 **/
    @GetMapping("/filter")
    public ResponseEntity getQuestionFilterByAnswer(@RequestParam boolean hasAnswer,
                                                    @RequestParam(name = "page", defaultValue = "0") int page,
                                                    @RequestParam(name = "size", defaultValue = "10") int size){
        Page<Question> pageQuestions = questionService.readQuestionsFilterByAnswer(hasAnswer,page,size);
        boolean hasNextPage = pageQuestions.hasNext();

        List<Question> questions = pageQuestions.getContent();

        List<QuestionResponseDto> resultQuestions = mapper.listQuestionToListQuestionResponseDto(questions);

        return new ResponseEntity<>(new ScrollResponseDto<>(resultQuestions, hasNextPage), HttpStatus.OK);
    }

    /** ✅선택 질문 조회(Read) - 질문,질문 댓글,답변,답변 댓글 전부 나와야함 **/
    @Transactional
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id")@Positive long question_id){
        Question question = questionService.readQuestion(question_id);
        return new ResponseEntity<>(mapper.questionToQuestionResponseAllDto(question),HttpStatus.OK);
    }


    /** ✅질문 수정(Update) **/
    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long question_id,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto){
        questionPatchDto.setQuestion_id(question_id);
        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto));

        return new ResponseEntity<>(mapper.questionToQuestionResponseAllDto(question),HttpStatus.OK);
    }

    /** ✅질문 삭제(Delete) **/
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") long question_id){
        questionService.deleteQuestion(question_id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /** ✅질문 검색 - 키워드로 검색 **/
    @GetMapping("/search")
    public ResponseEntity searchQuestion(@RequestParam("keyword") String keyword,
                                         @RequestParam(name = "page", defaultValue = "0") int page,
                                         @RequestParam(name = "size", defaultValue = "10") int size){
        Page<Question> pageQuestions = questionService.searchQuestion(keyword, page, size);

        boolean hasNextPage = pageQuestions.hasNext();

        List<Question> questions = pageQuestions.getContent();
        List<QuestionResponseDto> resultQuestion = mapper.listQuestionToListQuestionResponseDto(questions);

        return new ResponseEntity<>(new ScrollResponseDto<>(resultQuestion,hasNextPage),HttpStatus.OK);
    }

}
