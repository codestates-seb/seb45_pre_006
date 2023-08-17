package com.example.stackoverflow.answer.mapper;

import com.example.stackoverflow.answer.dto.AnswerPatchDto;
import com.example.stackoverflow.answer.dto.AnswerPostDto;
import com.example.stackoverflow.answer.dto.AnswerResponseDto;
import com.example.stackoverflow.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnswerMapper {


    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);

    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);

//    default AnswerResponseDto answerToAnswerResponseDto(Answer answer){
//        AnswerResponseDto answerResponseDto = new AnswerResponseDto();
//        answerResponseDto.setAnswer_id(answer.getAnswer_id());
//        answerResponseDto.setQuestion_id(answer.getQuestion().getQuestion_id());
//        answerResponseDto.setAnswer_content(answer.getAnswer_content());
//        answerResponseDto.setAnswer_createdAt(answer.getAnswer_createdAt());
//        answerResponseDto.setAnswer_modifiedAt(answer.getAnswer_modifiedAt());
//        answerResponseDto.setAnswer_accepted(answer.getAnswer_accepted());
//        answerResponseDto.setAnswer_recommendation(answer.getAnswer_recommendation());
//        return answerResponseDto;
//    }
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);
}
