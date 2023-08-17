package com.example.stackoverflow.answer.mapper;

import com.example.stackoverflow.answer.dto.AnswerPatchDto;
import com.example.stackoverflow.answer.dto.AnswerPostDto;
import com.example.stackoverflow.answer.dto.AnswerResponseDto;
import com.example.stackoverflow.answer.entity.Answer;
import com.example.stackoverflow.answercomment.dto.AnswerCommentResponseDto;
import com.example.stackoverflow.answercomment.entity.AnswerComment;
import com.example.stackoverflow.question.dto.QuestionResponseDto;
import com.example.stackoverflow.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {


    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);

    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);

    AnswerResponseDto answerToAnswerResponseDto(Answer answer);


}
